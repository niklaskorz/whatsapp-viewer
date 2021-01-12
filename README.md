A web-based viewer for your local decrypted WhatsApp backup, based on my chat application [nkchat](https://github.com/niklaskorz/nkchat).

Right now, it supports viewing single and group chats, video, audio and pictures, as well as link previews.

## Usage

First, make sure you have a recent version of nodejs (>=14) and npm or yarn installed.
Put your decrypted WhatsApp backup into a `backup/` subdirectory of the current working directory.
The files needed from your backup are `wa.db` and `msgstore.db`. Optionally, you can also put your WhatsApp media files into `backup/Media/`.
Then, run whatsapp-viewer through npx as `npx whatsapp-viewer` or install it globally as `whatsapp-viewer` through `yarn global add whatsapp-viewer`.
If your browser does not open automatically, manually navigate to `http://localhost:3000` to view your backup.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk.

Favicon by [Roundicons](https://www.iconfinder.com/icons/2560342/media_message_network_social_icon)
