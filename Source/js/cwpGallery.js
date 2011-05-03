/*
---
description: cwpGallery, yet another image gallery

license:
- MIT-style

authors:
- Johannes Fischer

requires:
- core/1.3: '*'
- more/1.3: 'Assets'

provides:
- cwpGallery

...
*/

var cwpGallery = new Class({

	Implements: Options,

	busy: false,
	currentImage: null,
	disableScrolling: false,
	initialized: false,

	options: {
		animateTitle: true,
		enableKeys: true,
		fxDuration: 500,
		fxTransition: 'cubic:out',
		scrollRange: 4,
		captionSource: 'title'
	},
	
	initialize: function(element, options)
	{
		this.element = $(element);
		// Image container
		this.imageHolder = this.element.getElement('div');
		// Thumbnail container
		this.thumbnailHolder = null;
		// List elements
		this.thumbnails = this.element.getElements('li');

		this.setOptions(options);

		this.createControls();
		this.initThumbnails();
		this.createLoader();
		if(this.options.enableKeys)
		{
			this.attachKeyEvents();
		}
		this.loadImage(this.thumbnails[0].getElement('a'), 0);
	},

	attachKeyEvents: function()
	{
		// TODO addEvent keydown doesn't work in FF
		document.body.addEvent('keydown', function(e){
			var key = e.key;

			if(key == 'left')
			{
				this.previous();
			}
			if(key == 'right')
			{
				this.next();
			}
		}.bind(this));
	},
	
	centerImage: function(image)
	{
		var imageSize = image.getSize();
		var parentSize = image.getParent().getSize();

		// TODO hoehe des Titles von margin-top abziehen, wenn animation deaktiviert ist

		image.setStyles({
			marginLeft: ((parentSize.x - imageSize.x) / 2).round(),
			marginTop: ((parentSize.y - imageSize.y) / 2).round()
		});
	},
	
	createControls: function()
	{
		var width = (this.imageHolder.getWidth() / 3).round();

		new Element('span', {
			'class': 'control-holder',
			events: {
				click: function(){
					this.previous();	
				}.bind(this)
			},
			styles: {
				left: 0,
				width: width
			}
		}).grab(
			new Element('span', {
				'class': 'control-previous'
			})
		).inject(this.imageHolder);

		new Element('span', {
			'class': 'control-holder',
			events: {
				click: function(){
					this.next();	
				}.bind(this)
			},
			styles: {
				right: 0,
				width: width
			}
		}).grab(
			new Element('span', {
				'class': 'control-next'
			})
		).inject(this.imageHolder);
	},
	
	createLoader: function()
	{
		this.loader = new Element('div.loading', {
			styles: {
				opacity: 0	
			}
		}).inject(this.imageHolder);
	},
	
	initThumbnails: function()
	{
		this.thumbnails.getElements('a').each(function(el, i){
			el.addEvent('click', function(e){
				e.stop();
				this.loadImage(el, i);
			}.bind(this));
		}, this);

		var thumbnailWidth = this.thumbnails[0].getElement('a').getWidth();

		var styles = this.thumbnails[0].getStyles('margin-left', 'margin-right', 'padding-left', 'padding-right');

		var spacing = 0;

		Object.each(styles, function(el){
			spacing+= el.toInt();
		});

		thumbnailWidth+= spacing;

		this.thumbnails[0].store('spacing', spacing);

		var ul = this.element.getElement('ul');

		this.thumbnailHolder = new Element('div.thumbnail-holder').inject(this.element);

		new Element('div').wraps(ul).inject(this.thumbnailHolder);

		ul.setStyle('width', thumbnailWidth*this.thumbnails.length);

		if(thumbnailWidth*this.thumbnails.length < ul.getParent().getWidth())
		{
			this.disableScrolling = true;
			return;
		}

		var leftControl = new Element('span.scroll-left', {
			events: {
				click: function(){
					this.scrollThumbnails(leftControl);
				}.bind(this)
			}
		}).inject(this.thumbnailHolder);

		var controlRight = new Element('span.scroll-right', {
			events: {
				click: function(){
					this.scrollThumbnails(controlRight);
				}.bind(this)
			}
		}).inject(this.thumbnailHolder);
	},

	insertImage: function(image ,i)
	{
		var target = this.imageHolder.getElement('.images');

		// insert after current image
		if(i > this.currentImage)
		{
			var styles = {
				right: 0
			};
			var where = 'bottom';
		}
		// insert before current image
		else if(i < this.currentImage || (this.curentImage == 0 && i == this.thumbnails.length))
		{
			var styles = {
				left: 0
			};
			var where = 'top';
			target.setStyle('left', this.imageHolder.getWidth() * -1);
			target.getElement('div').setStyle('right', 0);
		}

		new Element('div', {
			styles: styles
		}).adopt(image).inject(target, where);

		this.centerImage(image);

		target.setStyle('width', this.imageHolder.getWidth() * 2);

		var left = where == 'top' ? 0 : this.imageHolder.getWidth() * -1;

		this.setTitle(image.getParent());

		new Fx.Tween(target, {
			duration: this.options.fxDuration,
			transition: this.options.fxTransition
		}).start('left', left).chain(function(){
			// remove previous image
			if(where == 'bottom')
			{
				var div = target.getElement('div');
			}
			else
			{
				var div = target.getElements('div')[1];
			}
			div.dispose();

			// reset styles
			target.setStyles({
				left: 0,
				width: this.imageHolder.getWidth()
			});
			this.currentImage = i;
			this.busy = false;
		}.bind(this));
	},

	loadImage: function(el, i)
	{
		if(i == this.currentImage || this.busy)
		{
			return;
		}

		this.busy = true;

		this.loader.fade(1);

		var image = new Asset.image(el.get('href'), {
			title: el.getElement('img').get(this.options.titleSource),
			onload: function(){
				this.loader.fade(0);
				this.setActiveThumbnail(i);

				if(this.initialized)
				{
					this.insertImage(image, i);
				}
				else
				{
					new Element('div.images').adopt(
						new Element('div').adopt(
							image
						)
					).inject(this.imageHolder, 'top');
					this.centerImage(image);
					this.setTitle(image.getParent());
					this.currentImage = i;
					this.busy = false;
					this.initialized = true;
				}
			}.bind(this)
		})
	},
	
	next: function()
	{
		var i = this.currentImage + 1;
		if(i >= this.thumbnails.length)
		{
			i = 0;
		}
		this.loadImage(this.thumbnails[i].getElement('a'), i);
	},

	previous: function()
	{
		var i = this.currentImage - 1;
		if(i < 0)
		{
			i = this.thumbnails.length - 1;
		}
		this.loadImage(this.thumbnails[i].getElement('a'), i);
	},
	
	scroll: function(to)
	{
		var ul = this.thumbnailHolder.getElement('ul');

		// center thumbnail
		var center = (this.thumbnailHolder.getElement('div').getWidth() / 2).round();
		var limit = (ul.getWidth() - (center * 2) - this.thumbnails[0].retrieve('spacing'));

		var coordinates = {};
		var left = to;

		if(to != undefined)
		{
			coordinates = ul.getElement('.active').getCoordinates(ul);
			left = (coordinates.left - center + (coordinates.width / 2).round());
		}
		if(coordinates.left < center || to < 0)
		{
			left = 0;
		}
		else if(left >= limit)
		{
			left = limit;
		}

		if(left != ul.getStyle('left').toInt())
		{
			new Fx.Tween(ul, {
				duration: 500,
				transition: 'quart:out'
			}).start('left', left * -1);
		}
	},
	
	scrollThumbnails: function(el)
	{
		var ul = this.thumbnailHolder.getElement('ul');

		var thumbnailWidth = this.thumbnails[0].getWidth() + this.thumbnails[0].retrieve('spacing');		
		var left = ul.getStyle('left').toInt() *-1;
		
		if(el.get('class').test('left'))
		{
			this.scroll(left - (thumbnailWidth * this.options.scrollRange));
		}
		else
		{
			this.scroll(left + (thumbnailWidth * this.options.scrollRange));
		}
	},
	
	setActiveThumbnail: function(i)
	{
		var active = this.thumbnailHolder.getElement('.active');

		if(active)
		{
			active.removeClass('active');
		}

		this.thumbnails[i].addClass('active');

		if(!this.disableScrolling)
		{
			this.scroll();
		}
	},

	setTitle: function(target)
	{
		var image = target.getElement('img');
		var title = image.get('title');
		image.removeAttribute('title');

		if(title)
		{
			var span = new Element('span', {
				'class': 'image-title',
				html: '<span>'+title+'</span>'
			}).inject(target);

			if(this.options.animateTitle)
			{
				var imageCoordinates = image.getCoordinates(target);

				span.setStyles({
					bottom: imageCoordinates.top,
					opacity: 0,
					left: image.getStyle('margin-left').toInt(),
					width: imageCoordinates.width
				});

				new Fx.Morph(span, {}).start({
					height: [0, span.getHeight()],
					opacity: 1
				});
			}
		}
	}

});