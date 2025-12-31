/* eslint-env jest */
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/test-utils';
import MovieCard from '../MovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  backdrop_path: '/test-backdrop.jpg',
  vote_average: 8.5,
  release_date: '2023-01-15',
  adult: false,
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MovieCard Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render movie card with title, rating, and year', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />);
      
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText(/8.5/)).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    });

    it('should render movie image with correct attributes', () => {
     renderWithProviders(<MovieCard movie={mockMovie} /> );
     const image = screen.getByAltText('Test Movie');
     expect(image).toHaveAttribute('src');
     expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('alt', 'Test Movie')
    });

    it('should show correct rating badge (18+ or PG-13)', () => {
     const adultMovie = {...mockMovie, adult: true};
     renderWithProviders(<MovieCard movie={adultMovie} />);
     expect(screen.getByText('18+')).toBeInTheDocument;

     const regularMovie = {...mockMovie, adult: false};
     const {renderer} = renderWithProviders(<MovieCard movie={regularMovie} />);
     expect(screen.getByText("PG-13")).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should navigate to movie detail page when card is clicked', () => {
      renderWithProviders(<MovieCard movie={mockMovie} />);
      const card = screen.getByText('Test Movie').closest('div[class*="cursor-pointer"]');
      fireEvent.click(card);
      expect(mockNavigate).toHaveBeenCalledWith('/watch/1')
    });

    it('should add movie to my list when add button is clicked', () => {
      const {store} = renderWithProviders(<MovieCard movie={mockMovie} />);
      const addButton = screen.getByTitle(/Add to My List/i);
      fireEvent.click(addButton);
      const state = store.getState();
      expect(state.myList.movies).toHaveLength(1);
      expect(state.myList.movies[0].id).toBe(1);
      expect(state.myList.movies[0].title).toBe('Test Movie');
    });

    

    

  

  })
})