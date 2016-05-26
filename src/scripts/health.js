// Description
//   A hubot script that checks and reports the health of any dependent services
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   JD Courtoy <jd.courtoy@gmail.com>

export default ( robot ) => {
  robot.respond( /hello/, msg => {
    msg.reply( "hello!" );
  } );

  robot.hear( /orly/, msg => {
    msg.send( "yarly" );
  } );
}
