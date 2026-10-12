export interface Story { image: string; title: string; author: string; date: string; dateTime: string; alt: string }
export const stories: Story[] = [
  { image: 'mountains', title: 'The Mountains', author: 'John Appleseed', date: 'April 16th 2020', dateTime: '2020-04-16', alt: 'Snow-covered mountain peaks beneath a blue sky' },
  { image: 'cityscapes', title: 'Sunset Cityscapes', author: 'Benjamin Cruz', date: 'April 14th 2020', dateTime: '2020-04-14', alt: 'City skyline glowing at sunset' },
  { image: '18-days-voyage', title: '18 Days Voyage', author: 'Alexei Borodin', date: 'April 11th 2020', dateTime: '2020-04-11', alt: 'A traveler walking against a golden sunset' },
  { image: 'architecturals', title: 'Architecturals', author: 'Samantha Brooke', date: 'April 9th 2020', dateTime: '2020-04-09', alt: 'Curved contemporary building against the sky' },
  { image: 'world-tour', title: 'World Tour 2019', author: 'Timothy Wagner', date: 'April 7th 2020', dateTime: '2020-04-07', alt: 'A turquoise lake beneath a rugged mountain peak' },
  { image: 'unforeseen-corners', title: 'Unforeseen Corners', author: 'William Malcolm', date: 'April 3rd 2020', dateTime: '2020-04-03', alt: 'A lone tree silhouetted beneath a vivid purple sky' },
  { image: 'king-on-africa', title: 'King on Africa: Part II', author: 'Tim Hillenburg', date: 'March 29th 2020', dateTime: '2020-03-29', alt: 'A lion resting in the African wilderness' },
  { image: 'trip-to-nowhere', title: 'The Trip to Nowhere', author: 'Felicia Rourke', date: 'March 21st 2020', dateTime: '2020-03-21', alt: 'A single autumn tree in an open field' },
  { image: 'rage-of-the-sea', title: 'Rage of The Sea', author: 'Mohammed Abdul', date: 'March 19th 2020', dateTime: '2020-03-19', alt: 'Ocean waves crashing against the shore' },
  { image: 'running-free', title: 'Running Free', author: 'Michelle', date: 'March 16th 2020', dateTime: '2020-03-16', alt: 'A horse running freely through the countryside' },
  { image: 'behind-the-waves', title: 'Behind the Waves', author: 'Lamarr Wilson', date: 'March 11th 2020', dateTime: '2020-03-11', alt: 'Rolling waves on open water' },
  { image: 'calm-waters', title: 'Calm Waters', author: 'Samantha Brooke', date: 'March 9th 2020', dateTime: '2020-03-09', alt: 'Layered mountain ridges beneath a pink evening sky' },
  { image: 'milky-way', title: 'The Milky Way', author: 'Benjamin Cruz', date: 'March 5th 2020', dateTime: '2020-03-05', alt: 'The Milky Way filling a starry night sky' },
  { image: 'dark-forest', title: 'Night at The Dark Forest', author: 'Mohammed Abdul', date: 'March 4th 2020', dateTime: '2020-03-04', alt: 'Snowy mountain cliffs beneath a star-filled sky' },
  { image: 'somwarpet', title: 'Somwarpet’s Beauty', author: 'Michelle', date: 'March 1st 2020', dateTime: '2020-03-01', alt: 'Yellow flowers among lush green leaves' },
  { image: 'land-of-dreams', title: 'Land of Dreams', author: 'William Malcolm', date: 'February 25th 2020', dateTime: '2020-02-25', alt: 'A church rising above fog with mountains in the distance' },
];
export const features = [
  { icon: 'responsive', title: '100% Responsive', text: 'No matter which the device you’re on, our site is fully responsive and stories look beautiful on any screen.' },
  { icon: 'no-limit', title: 'No Photo Upload Limit', text: 'Our tool has no limits on uploads or bandwidth. Freely upload in bulk and share all of your stories in one go.' },
  { icon: 'embed', title: 'Available to Embed', text: 'Embed Tweets, Facebook posts, Instagram media, Vimeo or YouTube videos, Google Maps, and more.' },
  { icon: 'custom-domain', title: 'Custom Domain', text: 'With Photosnap subscriptions you can host your stories on your own domain. You can also remove our branding!' },
  { icon: 'boost-exposure', title: 'Boost Your Exposure', text: 'Users that viewed your story or gallery can easily get notified of new and featured stories with our built in mailing list.' },
  { icon: 'drag-drop', title: 'Drag & Drop Image', text: 'Easily drag and drop your image and get beautiful shots every time. No over the top tooling to add friction to creating stories.' },
];
export const plans = [
  { name: 'Basic', monthlyPrice: 19, description: 'Includes basic usage of our platform. Recommended for new and aspiring photographers.' },
  { name: 'Pro', monthlyPrice: 39, description: 'More advanced features available. Recommended for photography veterans and professionals.' },
  { name: 'Business', monthlyPrice: 99, description: 'Additional features available such as more detailed metrics. Recommended for business owners.' },
];
export const comparison = [
  { name: 'Unlimited Story Posting', availability: [true, true, true] },
  { name: 'Unlimited Photo Upload', availability: [true, true, true] },
  { name: 'Embedding Custom Content', availability: [false, true, true] },
  { name: 'Customize Metadata', availability: [false, true, true] },
  { name: 'Advanced Metrics', availability: [false, false, true] },
  { name: 'Photo Downloads', availability: [false, false, true] },
  { name: 'Search Engine Indexing', availability: [false, false, true] },
  { name: 'Custom Analytics', availability: [false, false, true] },
];
