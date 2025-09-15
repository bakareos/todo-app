# Sticky Todos 📝

A beautiful, interactive todo list application with a sticky note design and modern features.

![Sticky Todos Preview](https://img.shields.io/badge/Status-Live-brightgreen)

## ✨ Features

- **📌 Sticky Note Design**: Each todo appears as a colorful sticky note with random rotation for a natural look
- **🌓 Dark/Light Mode**: Toggle between light and dark themes with smooth transitions
- **🔍 Smart Filtering**: View all tasks, only active tasks, or completed tasks
- **⌨️ Keyboard Shortcuts**: 
  - `Enter` to quickly add new tasks
  - `Delete` key to remove focused tasks
- **💾 Local Storage**: Your todos persist between browser sessions
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **♿ Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Getting Started

### Option 1: Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/bakareos/todo-app.git
   cd todo-app
   ```

2. Open `index.html` in your web browser, or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 5000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:5000` in your browser

### Option 2: GitHub Pages

This app can be deployed to GitHub Pages for free hosting. Simply enable GitHub Pages in your repository settings.

## 🎯 How to Use

1. **Add a Task**: Type in the input field and press `Enter` or click "Add"
2. **Complete a Task**: Click anywhere on a sticky note to mark it as completed
3. **Delete a Task**: Click the "Delete" button on any task, or focus the task and press `Delete` key
4. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
5. **Toggle Theme**: Click the 🌓 button to switch between light and dark modes
6. **Clear All**: Use the "Clear All" button to remove all tasks (with confirmation)

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS custom properties (variables) and flexbox
- **Vanilla JavaScript**: No frameworks needed - pure JavaScript for all functionality
- **Local Storage API**: For data persistence

## 📁 Project Structure

```
todo-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and themes
├── script.js           # Application logic and interactivity
└── README.md           # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS custom properties in `style.css`:

```css
:root {
  --bg: #f5f5f5;           /* Background color */
  --card-bg: #fff9c4;      /* Sticky note color */
  --accent: #4CAF50;       /* Accent color */
  --danger: #e74c3c;       /* Delete button color */
}
```

### Adding New Features

The code is well-structured and commented. Key functions include:

- `addTask()` - Creates new todos
- `toggleTask()` - Handles completion status
- `deleteTask()` - Removes todos
- `render()` - Updates the display
- `filterTasks()` - Handles filtering logic

## 🌟 Features in Detail

### Sticky Note Animation

Each todo gets a random rotation between -6° and +6° degrees for a natural sticky note appearance.

### Smart Filtering

- **All**: Shows every task
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only finished tasks

### Keyboard Accessibility

- Tab navigation through all interactive elements
- Enter key to add tasks
- Delete key to remove focused tasks
- Screen reader announcements for dynamic content

### Data Persistence

All tasks are automatically saved to your browser's local storage, so your todos persist between sessions.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Live Demo

Check out the live version at: [GitHub Pages Link](https://bakareos.github.io/todo-app)

---

Made with ❤️ for productivity enthusiasts