# README.md

This is a starter React frontend for the Form Builder app (Vite + React + Tailwind via CDN + Axios).

## Quick setup

1. Prerequisites: Node.js (v16+ recommended) and npm/yarn.

2. Create the project (or copy these files into a new folder):

```bash
# If you want Vite to scaffold for you (recommended):
npm create vite@latest form-builder-frontend -- --template react
cd form-builder-frontend
# Replace files in this repo with the files from this scaffold
npm install
```

3. Install runtime dependency:

```bash
npm install axios
```

4. Create a local env to point to your backend (optional but recommended):

```
# create .env.local (Vite reads VITE_ prefixed vars)
VITE_API_BASE_URL=http://localhost:5000
```

5. Run dev server:

```bash
npm run dev
# open the URL shown in the terminal (usually http://localhost:5173)
```


---

# Expected API endpoints (so the frontend works with the backend)

The frontend expects a backend with the following endpoints (JSON):

- `GET /api/forms` -> returns `[ { id, title, createdAt } ]`
- `GET /api/forms/:id` -> returns `{ id, title, fields: [ { id?, type, label, required, options } ] }`
- `POST /api/forms` -> accepts `{ title, fields }` -> returns `{ success: true, formId }`
- `POST /api/forms/:id/submit` -> accepts `{ data: { [fieldId]: value | string[] } }` -> returns `{ success: true }`
- `GET /api/forms/:id/submissions` -> returns `[{ id, templateId, submittedAt, data: [{ field_id, value }] }]` or a similar shape.


---

# File tree included in this scaffold

```
form-builder-frontend/
├─ index.html
├─ package.json
├─ .env.local (optional)
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api.js
│  ├─ styles.css
│  └─ components/
│     ├─ FormBuilder.jsx
│     ├─ FieldLibrary.jsx
│     ├─ FieldProperties.jsx
│     ├─ FillForms.jsx
│     └─ ViewSubmissions.jsx
```

---

# Notes
- Styling: Tailwind is loaded from CDN in `index.html` for quick setup. For production, follow Tailwind's official setup for Vite.
- This scaffold uses native HTML5 drag-and-drop (no external DnD lib) so it's lightweight and similar to your original single-file app.
- IDs for client-side fields are generated client-side; the backend should create its own persistent field IDs if needed.


----

// ---------------------------
// File: package.json
// ---------------------------
{
  "name": "form-builder-frontend",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}


// ---------------------------
// File: index.html
// ---------------------------
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Builder Pro - React</title>
    <!-- quick Tailwind via CDN for rapid prototyping -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


// ---------------------------
// File: src/main.jsx
// ---------------------------
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// ---------------------------
// File: src/api.js
// ---------------------------
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

export default api


// ---------------------------
// File: src/styles.css
// ---------------------------
/* small helper in case you want custom CSS alongside Tailwind */
:root { --card-radius: 0.75rem; }


// ---------------------------
// File: src/App.jsx
// ---------------------------
import React, { useState } from 'react'
import FormBuilder from './components/FormBuilder'
import FillForms from './components/FillForms'
import ViewSubmissions from './components/ViewSubmissions'

export default function App() {
  const [tab, setTab] = useState('builder')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Form Builder Pro</h1>
        <p className="text-gray-600">Create, fill, and manage custom forms with ease</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setTab('builder')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${tab === 'builder' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}>
            Form Builder
          </button>
          <button
            onClick={() => setTab('fill')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${tab === 'fill' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}>
            Fill Forms
          </button>
          <button
            onClick={() => setTab('view')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${tab === 'view' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}>
            View Submissions
          </button>
        </div>
      </div>

      {tab === 'builder' && <FormBuilder />}
      {tab === 'fill' && <FillForms />}
      {tab === 'view' && <ViewSubmissions />}
    </div>
  )
}


// ---------------------------
// File: src/components/FieldLibrary.jsx
// ---------------------------
import React from 'react'

const items = [
  { type: 'text', label: 'Text Input', emoji: '📝', color: 'from-blue-500 to-blue-600' },
  { type: 'email', label: 'Email', emoji: '📧', color: 'from-green-500 to-green-600' },
  { type: 'number', label: 'Number', emoji: '🔢', color: 'from-purple-500 to-purple-600' },
  { type: 'textarea', label: 'Text Area', emoji: '📄', color: 'from-orange-500 to-orange-600' },
  { type: 'select', label: 'Dropdown', emoji: '📋', color: 'from-pink-500 to-pink-600' },
  { type: 'radio', label: 'Radio Buttons', emoji: '🔘', color: 'from-teal-500 to-teal-600' },
  { type: 'checkbox', label: 'Checkboxes', emoji: '☑️', color: 'from-indigo-500 to-indigo-600' }
]

export default function FieldLibrary() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Field Library</h3>
      <div className="space-y-3">
        {items.map(it => (
          <div
            key={it.type}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', it.type)}
            className={`bg-gradient-to-r ${it.color} text-white p-3 rounded-lg cursor-pointer select-none`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{it.emoji}</span>
              <span className="font-medium">{it.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ---------------------------
// File: src/components/FieldProperties.jsx
// ---------------------------
import React from 'react'

export default function FieldProperties({ field, onUpdate, onAddOption, onRemoveOption }) {
  if (!field) return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Field Properties</h3>
      <div id="fieldProperties" className="text-gray-500">Select a field to edit its properties</div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Field Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate(field.id, 'label', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={!!field.required}
              onChange={(e) => onUpdate(field.id, 'required', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Required field</span>
          </label>
        </div>

        {Array.isArray(field.options) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
            <div id="optionsContainer" className="space-y-2">
              {field.options.map((opt, idx) => (
                <div key={idx} className="flex">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => onUpdate(field.id, ['options', idx].join('.'), e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveOption(field.id, idx) }}
                    className="px-3 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                  >✕</button>
                </div>
              ))}
            </div>
            <button
              onClick={() => onAddOption(field.id)}
              className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-500"
            >
              + Add Option
            </button>
          </div>
        )}

      </div>
    </div>
  )
}


// ---------------------------
// File: src/components/FormBuilder.jsx
// ---------------------------
import React, { useState } from 'react'
import FieldLibrary from './FieldLibrary'
import FieldProperties from './FieldProperties'
import api from '../api'

function uid() {
  return 'f_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7)
}

export default function FormBuilder() {
  const [currentForm, setCurrentForm] = useState([])
  const [selectedFieldId, setSelectedFieldId] = useState(null)
  const [formTitle, setFormTitle] = useState('')

  function addField(type) {
    const field = {
      id: uid(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      options: (type === 'select' || type === 'radio' || type === 'checkbox') ? ['Option 1', 'Option 2'] : null
    }
    setCurrentForm(prev => [...prev, field])
    setSelectedFieldId(field.id)
  }

  function removeField(id) {
    setCurrentForm(prev => prev.filter(f => f.id !== id))
    setSelectedFieldId(null)
  }

  function updateField(fieldId, property, value) {
    setCurrentForm(prev => prev.map(f => {
      if (f.id !== fieldId) return f
      // support nested option update (property like 'options.1')
      if (typeof property === 'string' && property.includes('.')) {
        const [root, idx] = property.split('.')
        const copy = { ...f }
        copy[root] = [...copy[root]]
        copy[root][Number(idx)] = value
        return copy
      }
      return { ...f, [property]: value }
    }))
  }

  function addOption(fieldId) {
    setCurrentForm(prev => prev.map(f => f.id === fieldId ? ({ ...f, options: [...f.options, `Option ${f.options.length + 1}`] }) : f))
  }

  function removeOption(fieldId, idx) {
    setCurrentForm(prev => prev.map(f => {
      if (f.id !== fieldId) return f
      const copy = { ...f }
      copy.options = copy.options.filter((_, i) => i !== idx)
      return copy
    }))
  }

  async function saveTemplate() {
    const title = formTitle.trim()
    if (!title) return alert('Please enter a form title')
    if (currentForm.length === 0) return alert('Please add at least one field')

    try {
      // send to backend
      await api.post('/api/forms', { title, fields: currentForm })
      alert('Form template saved successfully!')
      setFormTitle('')
      setCurrentForm([])
      setSelectedFieldId(null)
    } catch (err) {
      console.error(err)
      alert('Failed to save. Check the backend or console for details.')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div>
        <FieldLibrary />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Form Canvas</h3>
          <button onClick={() => { setCurrentForm([]); setFormTitle(''); setSelectedFieldId(null) }} className="text-red-500 hover:text-red-700 font-medium">Clear All</button>
        </div>

        <div className="mb-4">
          <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} type="text" placeholder="Enter form title..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        <div
          id="formCanvas"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const fieldType = e.dataTransfer.getData('text/plain'); addField(fieldType) }}
          className="min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50"
        >
          {currentForm.length === 0 ? (
            <p className="text-gray-500 text-center">Drag fields here to build your form</p>
          ) : (
            <div className="space-y-3">
              {currentForm.map(f => (
                <div key={f.id} onClick={() => setSelectedFieldId(f.id)} className={`field-wrapper mb-4 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 ${selectedFieldId === f.id ? 'border-blue-500 bg-blue-50' : ''}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">{f.label} {f.required ? '*' : ''}</label>
                    <button onClick={(e) => { e.stopPropagation(); removeField(f.id) }} className="text-red-500 hover:text-red-700">✕</button>
                  </div>
                  <div>
                    {f.type === 'text' && <input disabled className="w-full p-2 border border-gray-300 rounded" placeholder="Text input" />}
                    {f.type === 'email' && <input disabled className="w-full p-2 border border-gray-300 rounded" placeholder="Email input" />}
                    {f.type === 'number' && <input disabled className="w-full p-2 border border-gray-300 rounded" placeholder="Number input" />}
                    {f.type === 'textarea' && <textarea disabled className="w-full p-2 border border-gray-300 rounded" rows={3} placeholder="Text area" />}
                    {f.type === 'select' && (
                      <select disabled className="w-full p-2 border border-gray-300 rounded">
                        {f.options.map((o, i) => <option key={i}>{o}</option>)}
                      </select>
                    )}
                    {f.type === 'radio' && f.options.map((o, i) => (
                      <label key={i} className="flex items-center mb-1"><input disabled type="radio" className="mr-2" />{o}</label>
                    ))}
                    {f.type === 'checkbox' && f.options.map((o, i) => (
                      <label key={i} className="flex items-center mb-1"><input disabled type="checkbox" className="mr-2" />{o}</label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={saveTemplate} className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">Save Form Template</button>
      </div>

      <div>
        <FieldProperties
          field={currentForm.find(f => f.id === selectedFieldId)}
          onUpdate={updateField}
          onAddOption={addOption}
          onRemoveOption={removeOption}
        />
      </div>
    </div>
  )
}


// ---------------------------
// File: src/components/FillForms.jsx
// ---------------------------
import React, { useEffect, useState } from 'react'
import api from '../api'

export default function FillForms() {
  const [templates, setTemplates] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [template, setTemplate] = useState(null)

  useEffect(() => {
    api.get('/api/forms').then(res => setTemplates(res.data)).catch(() => setTemplates([]))
  }, [])

  useEffect(() => {
    if (!selectedId) return setTemplate(null)
    api.get(`/api/forms/${selectedId}`).then(res => setTemplate(res.data)).catch(() => setTemplate(null))
  }, [selectedId])

  function renderField(field) {
    const name = field.id
    switch (field.type) {
      case 'text': return <input name={name} required={field.required} className="w-full p-3 border border-gray-300 rounded-lg" />
      case 'email': return <input name={name} type="email" required={field.required} className="w-full p-3 border border-gray-300 rounded-lg" />
      case 'number': return <input name={name} type="number" required={field.required} className="w-full p-3 border border-gray-300 rounded-lg" />
      case 'textarea': return <textarea name={name} rows={4} required={field.required} className="w-full p-3 border border-gray-300 rounded-lg" />
      case 'select': return (
        <select name={name} defaultValue="" required={field.required} className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="">Choose an option...</option>
          {field.options.map((o,i) => <option key={i} value={o}>{o}</option>)}
        </select>
      )
      case 'radio': return field.options.map((o,i) => (
        <label key={i} className="flex items-center mb-2"><input name={name} type="radio" value={o} required={field.required} className="mr-3" />{o}</label>
      ))
      case 'checkbox': return field.options.map((o,i) => (
        <label key={i} className="flex items-center mb-2"><input name={name} type="checkbox" value={o} className="mr-3" />{o}</label>
      ))
      default: return <input name={name} className="w-full p-3 border border-gray-300 rounded-lg" />
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!template) return
    const fd = new FormData(e.target)
    const payload = { data: {} }

    template.fields.forEach(f => {
      if (f.type === 'checkbox') {
        payload.data[f.id] = fd.getAll(f.id)
      } else {
        payload.data[f.id] = fd.get(f.id) || ''
      }
    })

    try {
      await api.post(`/api/forms/${template.id}/submit`, payload)
      alert('Form submitted successfully!')
      e.target.reset()
    } catch (err) {
      console.error(err)
      alert('Failed to submit. Check console for errors.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Fill Out Forms</h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Form Template</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="">Choose a form template...</option>
            {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>

        <div id="fillFormContainer">
          {template && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">{template.title}</h4>
              {template.fields.map(f => (
                <div key={f.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{f.label} {f.required && <span className="text-red-500">*</span>}</label>
                  {renderField(f)}
                </div>
              ))}
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg">Submit Form</button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}


// ---------------------------
// File: src/components/ViewSubmissions.jsx
// ---------------------------
import React, { useEffect, useState } from 'react'
import api from '../api'

export default function ViewSubmissions() {
  const [templates, setTemplates] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    api.get('/api/forms').then(res => setTemplates(res.data)).catch(() => setTemplates([]))
  }, [])

  useEffect(() => {
    if (!selectedId) return setSubmissions([])
    api.get(`/api/forms/${selectedId}/submissions`).then(res => setSubmissions(res.data)).catch(() => setSubmissions([]))
  }, [selectedId])

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Form Submissions</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Form Template</label>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="">Choose a form template...</option>
          {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <div id="submissionsContainer">
        {submissions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No form submissions yet</p>
        ) : (
          submissions.map(s => (
            <div key={s.id} className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{s.templateTitle || 'Submission'}</h4>
                <span className="text-sm text-gray-500">{new Date(s.submittedAt || s.createdAt || s.submitted_at).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* submission.data might be an object or array depending on backend shape */}
                {Array.isArray(s.data) ? (
                  s.data.map((d, i) => (
                    <div key={i}>
                      <span className="text-sm font-medium text-gray-600">{d.label || d.field_id}:</span>
                      <p className="text-gray-800">{Array.isArray(d.value) ? d.value.join(', ') : d.value}</p>
                    </div>
                  ))
                ) : (
                  Object.entries(s.data || {}).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-sm font-medium text-gray-600">{k}:</span>
                      <p className="text-gray-800">{Array.isArray(v) ? v.join(', ') : v}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
