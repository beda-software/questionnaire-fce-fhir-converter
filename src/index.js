const express = require('express');
const { toFirstClassExtension, fromFirstClassExtension } = require('sdc-qrf/dist/converter/index.js');

const app = express();
app.use(express.json());

function validateQuestionnaire(req, res, next) {
  if (!req.body || req.body.resourceType !== 'Questionnaire') {
    return res.status(422).json({ error: 'Body must have resourceType: Questionnaire' });
  }
  next();
}

app.post('/to-fce', validateQuestionnaire, (req, res) => {
  try {
    const result = toFirstClassExtension(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Transformation error' });
  }
});

app.post('/to-fhir', validateQuestionnaire, (req, res) => {
  try {
    const result = fromFirstClassExtension(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Transformation error' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
