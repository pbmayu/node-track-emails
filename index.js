import express from 'express';
const PORT = process.env.PORT || 3001;

const app = express();

// Dummy database array to log opens (replace this with your actual database in production)
const openLogs = [];

// Endpoint to handle pixel tracking
app.get('/track-open', (req, res) => {
  const emailId = req.query.emailId; // Capture the email ID or user identifier

  // Log the open event (in production, you would store this in a database)
  openLogs.push({ emailId, openedAt: new Date() });
  console.log(`Email opened! ID: ${emailId}`);

  // Respond with a 1x1 transparent PNG
  const pixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/OCb+wAAAABJRU5ErkJggg==',
    'base64'
  );
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': pixel.length,
  });
  res.end(pixel);
  console.log(req.headers);
  console.log(openLogs);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});