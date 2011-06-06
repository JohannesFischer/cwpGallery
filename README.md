Nivoo-Slider
============

The Nivoo-Slider is an image gallery based on the jQuery Plugin NivoSlider (http://nivo.dev7studios.com/). It features 18 different transition effects.

![Screenshot 1](http://www.johannes-fischer.de/assets/Labs/nivoo-slider.png)

How to use
----------

Just include NivooSider.js and the NivooSlider.css to your site:

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
                    <img src="images/thumbnails/free-bokeh-texture-500x375.jpg" />
                </a>
            </li>
            <li>
                <a href="images/royalty-free-images-500x375.jpg">
                    <img src="images/thumbnails/royalty-free-images-500x375.jpg" />
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
- animSpeed - (number: defaults to 500) The time (duration) in ms of the transition
- autoPlay - (bool: defaults to true) Start the transition automatically after initializing
- cssClass - (string, defaults to nivooSlider) Name of the css class that is added after initializing the slider
- directionNav -(bool: deafults to true) Shows controls to go back and forth
- directionNavHide - (bool: defaults to false) Hides the navigation controls on mouseout, so they are only visible when the mouse cursor is over the slider element
- directionNavWidth - (number,string: defaults to 20%) Width of the clickable area of the directional navigation. Can be a number for pixels or a string with a percentage of the full width.
- effect - (string: defaults to sliceDown) Type of transition (see effects),
- interval - (number: defaults to 3000) Interval in ms between the transitions, required for the autoPlay function
- orientation - (string: defaults to vertical) Defines the direction of the transition, can be horizontal or vertical
- pauseOnHover - (bool: defaults to true) Clears the interval on mouseover
- slices - (number: defaults to 15) Number of the slices used for the transition

License
-------
MIT license