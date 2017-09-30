# MockServer Demo #

This project demonstrates how to start [MockServer](http://mock-server.com/) via docker and how to populate expectations.  It will demonstrate two
methods of expectation setting.  The first is to read files from the file system and to send their contents (JSON in most cases)
to the server using the JavaScript mockserver client (via node in this case). The second method will demonstrate setting up 
a dynamic user-facing environment which will let the user set expectations from a web-based GUI.  

Installation
============

This project utilizes Docker and node, so you'll need to have both of these tools installed. Once you have Docker installed (not covered here),
you can pull the MockServer image for docker following [these instructions](http://mock-server.com/mock_server/running_mock_server.html#docker_container). 

Note: This project does not use the default ports that MockServer runs on.  It uses port 9200 instead of 1080, as it is used in conjunction
with an app configured to communicate with Elasticsearch.  To start MockServer on port 9200 you can execute the `start_mockserver.sh` script in 
the root of this project.

Loading Expectations
====================
For this part you'll need to install the node project under the `loader` directory. I'm assuming you 

```bash
cd loader
yarn install
yarn run load
```

 