/* eslint-env mocha */
import chai from "chai";
import sinon from "sinon";

const assert = chai.assert;
sinon.assert.expose( chai.assert, { prefix: "" } );

describe( "health", () => {
  let robot;

  beforeEach( () => {
    robot = {
      respond: sinon.spy(),
      hear: sinon.spy()
    };
    require( "./health" )( robot );
  } );

  it( "should register a respond listener", () => {
    assert.calledWith( robot.respond, /hello/ );
  } );

  it( "should register a hear listener", () => {
    assert.calledWith( robot.hear, /orly/ );
  } );
} );
