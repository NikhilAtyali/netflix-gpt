# 🧪 Test Infrastructure

This directory contains all testing setup, utilities, and mock data for the Netflix GPT project.

---

## 📁 Structure

```
test/
├── README.md                 # This file
├── setupTests.js            # Global test setup (runs before all tests)
├── utils/
│   └── test-utils.jsx       # Custom render functions with providers
├── mocks/
│   ├── movieData.js         # Mock movie data for tests
│   └── firebase.js          # Mock Firebase auth for tests
└── __mocks__/
    ├── styleMock.js         # Mock CSS imports
    └── fileMock.js          # Mock file/image imports
```

---

## 📝 Files Explained

### `setupTests.js`
- Runs once before all tests
- Imports jest-dom matchers
- Sets up global mocks (matchMedia, IntersectionObserver, etc.)
- Configures test environment

### `utils/test-utils.jsx`
- **`renderWithProviders()`** - Custom render function that wraps components with:
  - Redux Provider
  - React Router
  - Any other context providers
- **`createMockStore()`** - Creates a mock Redux store for testing

### `mocks/movieData.js`
- Mock movie objects for testing
- Includes:
  - `mockMovie` - Single movie data
  - `mockMovieDetails` - Detailed movie data
  - `mockMovieList` - Array of movies
  - `mockMovieCredits` - Cast and crew data
  - `mockMovieVideos` - Video/trailer data
  - `mockGenres` - Genre list

### `mocks/firebase.js`
- Mock Firebase authentication functions
- Mock user data
- Mock auth errors
- Helper functions to setup/reset mocks

### `__mocks__/styleMock.js`
- Mocks CSS file imports
- Prevents errors when importing `.css`, `.scss`, etc.

### `__mocks__/fileMock.js`
- Mocks file imports (images, fonts, etc.)
- Returns a simple string for testing

---

## 🎯 Usage Examples

### Basic Component Test

```javascript
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/test-utils';
import MovieCard from '../MovieCard';
import { mockMovie } from '../../test/mocks/movieData';

it('should render movie card', () => {
  renderWithProviders(<MovieCard movie={mockMovie} />);
  expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
});
```

### Test with Custom Redux State

```javascript
import { renderWithProviders } from '../../test/utils/test-utils';

it('should show user as logged in', () => {
  const preloadedState = {
    user: { 
      isLoggedIn: true,
      user: { email: 'test@test.com' }
    }
  };
  
  renderWithProviders(<Navbar />, { preloadedState });
  expect(screen.getByText('test@test.com')).toBeInTheDocument();
});
```

### Using Mock Data

```javascript
import { mockMovie, mockMovieList } from '../../test/mocks/movieData';

it('should render movie list', () => {
  renderWithProviders(<MovieList movies={mockMovieList} />);
  expect(screen.getAllByRole('article')).toHaveLength(mockMovieList.length);
});
```

### Mocking Firebase

```javascript
import { 
  mockSignInWithEmailAndPassword,
  mockUser,
  resetFirebaseMocks 
} from '../../test/mocks/firebase';

beforeEach(() => {
  resetFirebaseMocks();
});

it('should login successfully', async () => {
  mockSignInWithEmailAndPassword.mockResolvedValue({ user: mockUser });
  
  // Test login flow
});
```

---

## 🛠️ Adding New Mocks

### Adding Mock Movie Data

```javascript
// In mocks/movieData.js
export const mockActionMovie = {
  id: 999,
  title: 'Action Movie',
  genre_ids: [28], // Action
  // ... other properties
};
```

### Adding New Mock Functions

```javascript
// In mocks/firebase.js
export const mockUpdatePassword = jest.fn();

// In your test
mockUpdatePassword.mockResolvedValue({ success: true });
```

---

## 📖 Best Practices

1. **Always use `renderWithProviders()`** instead of plain `render()`
   - Ensures all context providers are available

2. **Import mock data from central location**
   - Don't create mock data in individual tests
   - Reuse existing mocks when possible

3. **Clean up after tests**
   ```javascript
   afterEach(() => {
     jest.clearAllMocks();
   });
   ```

4. **Update mocks when data structure changes**
   - Keep mock data in sync with real data structures

5. **Keep mocks simple**
   - Only include properties needed for tests
   - Don't over-complicate mock data

---

## 🔗 Related Documentation

- [TESTING_GUIDE.md](../../docs/TESTING_GUIDE.md) - Complete testing guide
- [JEST_CHEATSHEET.md](../../docs/JEST_CHEATSHEET.md) - Quick reference
- [jest.config.js](../../jest.config.js) - Jest configuration
- [babel.config.cjs](../../babel.config.cjs) - Babel configuration

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Check if the mock file path is correct in `jest.config.js`

### Issue: "TextEncoder is not defined"
**Solution**: Already handled in `setupTests.js`

### Issue: Custom hooks not working
**Solution**: Make sure you're using `renderWithProviders()` not `render()`

---

## 📝 Notes

- All test files should be named `*.test.js` or `*.test.jsx`
- Place component tests in `__tests__` folder next to the component
- Place utility/hook tests in `__tests__` folder next to the file
- Global test setup in this directory

---

**Happy Testing!** 🎉

