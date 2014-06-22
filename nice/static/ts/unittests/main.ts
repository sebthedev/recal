/// <reference path="../typings/tsd.d.ts" />
import $ = require('jquery');
import View = require('../library/CoreUI/View');
import ViewTester = require('../library/Testers/ViewTester');
$(()=>
        {
            try
            {
                println('Starting unit tests');
                println('Testing View');

                var viewTester = new ViewTester<View>('View', new View($('<div>')));
                viewTester.run();

                testsSucceeded();
            }
            catch(err)
            {
                testsFailed(err);
            }
        }
 );

function testsSucceeded()
{
    println('Unit tests passed.')
}

function testsFailed(err : Error)
{
    println(err.toString());
}

function println(message : string)
{
    $('#content').append($('<div>').text(message));
}