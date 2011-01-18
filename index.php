<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <title>cwpGallery</title>
	<link rel="stylesheet" type="text/css" href="/SVN/Photobook/DE/css/style_basic_cfb09_de.css" />
	<link rel="stylesheet" type="text/css" href="cwpGallery.css" />
	<script type="text/javascript" src="mootools-1.2.4-core-yc.js"></script>
	<script type="text/javascript" src="mootools-1.2.4.4-more.js"></script>
	<script type="text/javascript" src="cwpGallery.js"></script>
	<script type="text/javascript">
		window.addEvent('domready', function(){
			new cwpGallery('cwpGallery');
		});	
	</script>
</head>
<body>
	
	<?php
		function img($data)
		{
			$html = '<img ';
			foreach($data as $key => $value)
			{
				$html.= $key.'="'.$value.'" ';
			}
			$html.= '/>';

			return $html;
		}
	
		mysql_connect('localhost', 'root', '');
		mysql_select_db('cewe_fotowelt');

		$galleryID = 1016;
	
		$sql = "SELECT cewe_galleries.folder, cewe_galleries.title AS gallerytitle, cewe_gallery_images.alt, cewe_gallery_images.src, cewe_gallery_images.title FROM cewe_galleries ";
		$sql.= "JOIN cewe_gallery_images ON cewe_gallery_images.gallery_id = cewe_galleries.id ";
		$sql.= "WHERE cewe_gallery_images.status = 1 AND cewe_galleries.id = {$galleryID} ";
		$sql.= "ORDER BY cewe_gallery_images.sort ASC";

		$q = mysql_query($sql);

		$images = array();

		while($r = mysql_fetch_object($q))
		{
			$folder = $r->folder;
			$title = $r->gallerytitle;
			$images[] = array(
				'alt' => $r->alt,
				'src' => $r->src,
				'title' => $r->title
			);
		}

		$image_count = count($images);

		$path = '/uploads/galleries/'.$folder.'/';
	?>

	    <h1><?php echo $gallerytitle; ?></h1>
	
	<div id="cwpGallery">

		<div class="image-holder">
			<div class="images"></div>
		</div>
		
		<div class="thumbnail-holder">
			<ul>
				<?php
					$o = '';
	
					foreach($images as $image)
					{
						$o.= '<li><a href="'.$path.$image['src'].'">';
						$o.= img(array(
							'alt' => $image['alt'],
							'height' => 100,
							'src' => $path.'thumbs/'.$image['src'],
							'title' => $image['title'],
							'width' => 100
						));
						$o.= '</a></li>';
					}
	
					echo $o;
				?>
			</ul>
		</div>

	</div>    
</body>
</html>
