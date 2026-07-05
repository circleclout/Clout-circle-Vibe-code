const m = require('lucide-react');
const keys = Object.keys(m);
console.log('Total exports:', keys.length);
// Check for Globe, Link, ExternalLink, etc
const generic = keys.filter(k => {
  const l = k.toLowerCase();
  return l.includes('globe') || l.includes('external') || l.includes('link') || l.includes('share') || l.includes('message');
});
console.log('Possible icons:', generic.join(', '));
