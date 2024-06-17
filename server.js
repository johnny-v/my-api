const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use(bodyParser.json());

const dataFile = './data.json';

// Load data from JSON file
async function loadData() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

// Save data to JSON file
async function saveData(data) {
  try {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// Sort helper function
const sortData = (data, field, order = 'asc') => {
  return data.sort((a, b) => {
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// API endpoint to search, sort, and paginate users
app.get('/requests', async (req, res) => {
  const { search, sort, order = 'asc', page = 1, limit = 50, status } = req.query;
  let data = await loadData();

  // Search functionality
  if (search) {
    data = data.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  // Sorting functionality
  if (sort) {
    data = sortData(data, sort, order);
  }

    // Status filtering
    if (status) {
      data = data.filter(user => user.status.toLowerCase() === status.toLowerCase());
    }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResults = data.slice(startIndex, Math.min(endIndex, data.length));

  res.json({
    total: data.length,
    page,
    limit,
    data: paginatedResults
  });
});

// Endpoint to update status of one or more cases
app.put('/update-status', async (req, res) => {
  const { ids, status } = req.body;
  let data = await loadData();

  if (!ids || !status) {
    return res.status(400).json({ message: 'IDs and status are required' });
  }

  const validStatuses = ['Accepted', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided' });
  }

  let updatedCount = 0;
  data.forEach(item => {
    if (ids.includes(item.caseID)) {
      item.status = status;
      updatedCount++;
    }
  });

  await saveData(data);

  res.json({
    message: `Status updated to ${status} for ${updatedCount} cases.`,
    updatedCount
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
