Nivoo-Slider
============

The Nivoo-Slider is an image gallery based on the jQuery Plugin NivoSlider (http://nivo.dev7studios.com/). It features 18 different transition effects.

![Screenshot 1](http://www.johannes-fischer.de/assets/Labs/labs-cwpGallery.png)

How to use
----------

Just include cwpGallery.js and cwpGallery.css to your site:

#HTML
	<script type="text/javascript" src="js/cwpGallery.js"></script>
	<link  href="css/cwpGallery.css" rel="stylesheet" type="text/css" media="screen" />
	
And the gallery structure:
	
#HTML
    <div class="cwpGallery" id="Gallery">

        <div class="gallery-image-holder"></div>
    
        <ul>
            <li>
                <a href="images/bokeh-texture-free-500x375.jpg">
                    <img src="images/thumbnails/bokeh-texture-free-500x375.jpg" alt="" height="50" width="67" title="Write something usefull" />
                </a>
            </li>
            <li>
                <a href="images/bokeh-textures-500x375.jpg">
                    <img src="images/thumbnails/bokeh-textures-500x375.jpg" alt="" height="50" width="67" title="Write something usefull" />
                </a>
            </li>
            <li>
                <a href="images/bokeh-textures-royalty-free-images-500x375.jpg">
                    <img src="images/thumbnails/bokeh-textures-royalty-free-images-500x375.jpg" alt="" height="50" width="67" title="Write something usefull" />
                </a>
            </li>
            <li>
                <a href="images/bokeh-textures-royalty-free-stock-photo-500x375.jpg">
                    <img src="images/thumbnails/bokeh-textures-royalty-free-stock-photo-500x375.jpg" alt="" height="50" width="67" title="Write something usefull" />
                </a>
            </li>
            <li>
                <a href="images/free-bokeh-texture-500x375.jpg">
                    <img src="images/thumbnails/free-bokeh-texture-500x375.jpg" height="50" width="67" />
                </a>
            </li>
            <li>
                <a href="images/royalty-free-images-500x375.jpg">
                    <img src="images/thumbnails/royalty-free-images-500x375.jpg" height="50" width="67" />
                </a>
            </li>
        </ul>
    
    </div>	
	
And then initialize the slider using the domready event:

#JS
    window.addEvent('domready',function(){

        // The simple way
        new cwpGallery($('Gallery'));
        
        // The more advanced way
        ...
    
    }

Documentation
-------------

## Class: cwpGallery ##

### Syntax ###

#JS
	var slider = new cwpGallery(element[, options]);
	
#### Arguments ####
1. element - (mixed) An Element or the string id of an Element to apply the gallery to.
2. options - (object, optional) The cwpGallery options object, described below:

#### Options ####
- enableKeys - (bool: default is true)
- fxDuration - (int: default is 500)
- fxTransition -(string: dfault is cubic:out)
- scrollRange - (number: default is 4) 

License
-------
MIT license