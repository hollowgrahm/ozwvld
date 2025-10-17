# Background Video Setup

The homepage features a full-screen looping video background inspired by the Distortion Dynamics aesthetic.

## Current Video

The default video is hosted on Shopify's CDN (from the Distortion Dynamics site):
\`\`\`
https://cdn.shopify.com/videos/c/o/v/d4d2fe9fbbc14c01aaf4c20d447da032.mov
\`\`\`

## To Use Your Own Video:

### Option 1: Host on External CDN

1. Upload your video to a CDN (Cloudinary, Vimeo, Bunny CDN, etc.)
2. Update the video source in `app/page.tsx`:
   \`\`\`tsx
   <video autoPlay muted loop playsInline>
     <source src="YOUR_VIDEO_URL" type="video/mp4" />
   </video>
   \`\`\`

### Option 2: Host in Public Folder

1. Add your video file to `/public/background.mp4`
2. Update the source:
   \`\`\`tsx
   <video autoPlay muted loop playsInline>
     <source src="/background.mp4" type="video/mp4" />
   </video>
   \`\`\`

**Note:** Keep video files under 10MB for optimal performance. Consider using compressed formats.

### Option 3: Disable Video

If you don't want a video background, you can:

1. Remove the video element from `app/page.tsx`
2. Add a static background color or gradient:
   \`\`\`tsx
   <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black to-dark-gray" />
   \`\`\`

## Video Specifications

For best results:

- **Format:** MP4 (H.264 codec)
- **Size:** Under 10MB
- **Resolution:** 1920x1080 or 1280x720
- **Frame rate:** 24-30 fps
- **Duration:** 5-15 seconds (will loop)

## Tools for Video Compression

- [HandBrake](https://handbrake.fr/) - Free, open-source
- [FFmpeg](https://ffmpeg.org/) - Command-line tool
- [CloudConvert](https://cloudconvert.com/) - Online converter

### Example FFmpeg Command:

\`\`\`bash
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset fast output.mp4
\`\`\`
