// Description
//   A hubot script that checks and reports the health of any dependent services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot health - Responds with the current health of the monitored systems
//
// Notes:
//   Also supplied an HTTP endpoint at '/hubot/health' that responds with a health check
//
// Author:
//   JD Courtoy <jd.courtoy@gmail.com>
const aupair = require( "aupair" );

function transformHealthy( healthy, message ) {
  return healthy ? `[✓] ${message}` : `[✗] ${message}`;
}

function transform( status ) {
  let message = `${transformHealthy( status.healthy, "Overall" )}`;
  for ( let dependency of status.details ) {
    message += `\n${transformHealthy( dependency.healthy, dependency.name )}`;
    if ( !dependency.healthy ) {
      message += `: ${dependency.error}`;
    }
  }
  return message;
}

export default robot => {
  robot.respond( /health/, msg => {
    aupair.check()
      .then( status => msg.reply( transform( status ) ) )
      .catch( err => console.log( err.stack ) );
  } );

  robot.router.get( "/hubot/health", ( req, res ) => {
    aupair.check()
      .then( payload => {
        res.set( "Content-Type", "application/json" );
        res.send( JSON.stringify( payload ) );
      } );
  } );
};
