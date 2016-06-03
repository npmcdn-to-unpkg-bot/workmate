********
Workmate
********

|Build_Status| |Coverage_Status|

Readme
******

.. |Build_Status| image:: http://img.shields.io/travis/bigmassa/workmate/master.svg
   :target: https://travis-ci.org/bigmassa/workmate
.. |Coverage_Status| image:: http://img.shields.io/coveralls/bigmassa/workmate/master.svg
   :target: https://coveralls.io/r/bigmassa/workmate?branch=master

Useful Commands
***************

Delete pycache::

   find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf


Compile Typescript in the Browser
*********************************

Add to bottom of page::

   <script src="https://npmcdn.com/core-js/client/shim.min.js"></script>
   <script src="https://npmcdn.com/zone.js@0.6.12"></script>
   <script src="https://npmcdn.com/reflect-metadata@0.1.3"></script>
   <script src="https://npmcdn.com/systemjs@0.19.27/dist/system.src.js"></script>
   <script src="{% static 'workmate/ng/systemjs.config.js' %}"></script>
   <script>
      System.import('app/agile').catch(function(err){ console.error(err); });
   </script>

