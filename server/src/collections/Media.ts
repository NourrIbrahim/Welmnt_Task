import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Allows anyone to read media files
  },
  fields: [
    {
      name: 'alt', // Field to describe the image
      type: 'text',
      required: true, // Marks the alt text as mandatory
      label: 'Alt Text',
    },
  ],
  upload: {
    // File upload configuration
    staticDir: 'media', // Directory to store files on the server
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif'], // Allowed file types
    adminThumbnail: 'thumbnail', // Optional: Thumbnail generation for admin panel preview
  },
};
