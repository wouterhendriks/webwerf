To use this photoalbum:

Siteprofile:
```XML
<applysiteprofile fullpath="moduleroot::webwerf/data/general/photoalbum.xml" />
```
In `<webdesign>`:

```JS
async="true"
```

In the module webdesign in which you want to use the photo album:

```
npm install jquery --save
```

(this is to make sure there will be no jQuery version conflicts, by 'forcing' developers to provide jQuery themselves)

JavaScript:
```JS
import '@webhare-webwerf/photoalbum';
```
This will enable a new default photo album folder.

If you want complete control, these are the steps, instead of the last JS 'import' directive:

JavaScript:
```JS
import * as DomPack from "dompack";
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
