# Replace default photo album #

The following will enable a new default photo album folder in your site.

1) Make sure 'async' is enabled in your `<webdesign>`:

```JS
async="true"
```

2) In the module webdesign root folder in which you want to use the photo album:

```
npm install jquery --save
```

(this is to make sure there will be no jQuery version conflicts, by 'forcing' developers to provide jQuery themselves)

3) JavaScript:
```JS
import '@webhare-webwerf/photoalbum';
```

4) Siteprofile:

```XML
<applysiteprofile fullpath="moduleroot::webwerf/data/general/photoalbum.xml" />
```

# Only use the frontend #

To have complete control and basically only use the frontend side of things, you should do the following. Perform steps 1 and 2 first, and then:

JavaScript:
```JS
import * as DomPack from 'dompack';
import * as PhotoAlbum from '@webhare-webwerf/photoalbum';

DomPack.onDomReady(() => {
  PhotoAlbum.setup('my-photoalbum');
});
```

Witty:
```HTML
<div class="my-photoalbum">
  [forevery photos]
    <a href="[image.link]">
      [! It is advised to set width and height !]
      <img src="[thumb.link]" width="[thumb.width]" height="[thumb.height]" />
    </a>
  [/forevery]
</div>
```

For a library (whlib) example, refer to /webdesigns/general/photoalbum/photoalbum.whlib (make sure Witty gets its cells).
