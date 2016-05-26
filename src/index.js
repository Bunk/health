import fs from "fs";
import path from "path";

function shouldLoad( scripts, script ) {
  return !scripts || scripts.indexOf( "*" ) >= 0 && scripts.indexOf( script ) >= 0;
}

function parseHelp( scriptsPath, script ) {
  const HUBOT_DOCUMENTATION_SECTIONS = [
    'description',
    'dependencies',
    'configuration',
    'commands',
    'notes',
    'author',
    'authors',
    'examples',
    'tags',
    'urls'
  ];
  const body = fs.readFileSync( path.join( scriptsPath, script ), 'utf-8' );

  let commands = [];
  let currentSection;

  body.split( "\n" ).forEach( line => {
    if ( line.substr( 0, 2 ) !== "//" ) {
      return;
    }

    let cleanedLine = line.replace( /^(\/\/)\s?/, "" ).trim();
    if ( !cleanedLine.length || cleanedLine.toLowerCase() === "none" ) {
      return;
    }

    let nextSection = cleanedLine.toLowerCase().replace( ":", "" );
    if ( HUBOT_DOCUMENTATION_SECTIONS.indexOf( nextSection ) >= 0 ) {
      currentSection = nextSection;
    } else if ( currentSection === "commands" ) {
      commands.push( cleanedLine.trim() );
    }
  } );

  return commands;
}

export default ( robot, scripts ) => {
  const scriptsPath = path.resolve( __dirname + "/scripts" );

  if ( fs.existsSync( scriptsPath ) ) {
    const potentialScripts = fs.readdirSync( scriptsPath ).sort();

    potentialScripts.forEach( script => {
      if ( shouldLoad( scripts, script ) ) {
        robot.loadFile( scriptsPath, script );

        const commands = parseHelp( scriptsPath, script );
        commands.forEach( command => {
          if ( !command || robot.commands.indexOf( command ) >= 0 ) {
            return;
          }
          robot.commands.push( command );
        } );
      }
    } );
  }
}
