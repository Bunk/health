/* eslint-env mocha */
import chai from "chai";
import sinon from "sinon";
import health from "./health";

const assert = chai.assert;
sinon.assert.expose( chai.assert, { prefix: "" } );

describe( "health", () => {
  let robot;

  beforeEach( () => {
    robot = {
      respond: sinon.spy(),
      hear: sinon.spy(),
      router: {
        get: sinon.spy()
      }
    };
    health( robot );
  } );

  it( "should register a respond listener", () => {
    assert.calledWith( robot.respond, /health/ );
  } );

  it( "should register a router command", () => {
    assert.calledWith( robot.router.get, "/hubot/health" );
  } );
} );
