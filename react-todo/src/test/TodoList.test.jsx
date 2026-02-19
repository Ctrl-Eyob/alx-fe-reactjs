import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TodoList from '../components/TodoList';

describe('TodoList Component Implementation Tests', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  // Test 1: Check if component renders with initial todos
  it('should render the todo list component with initial todos', () => {
    // Check main component elements
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    expect(screen.getByTestId('filter-controls')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('todo-stats')).toBeInTheDocument();

    // Check initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();

    // Check filter buttons
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (3)');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (3)');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (0)');

    // Check stats
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Active: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
  });

  // Test 2: Check if input field accepts user input
  it('should accept user input in the todo input field', async () => {
    const input = screen.getByTestId('todo-input');
    
    await userEvent.type(input, 'New test todo');
    
    expect(input).toHaveValue('New test todo');
  });

  // Test 3: Check if add button is disabled when input is empty
  it('should disable add button when input is empty', () => {
    const addButton = screen.getByTestId('add-button');
    const input = screen.getByTestId('todo-input');
    
    expect(addButton).toBeDisabled();
    expect(input).toHaveValue('');
  });

  // Test 4: Check if add button is enabled when input has text
  it('should enable add button when input has text', async () => {
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await userEvent.type(input, 'Test todo');
    
    expect(addButton).not.toBeDisabled();
  });

  // Test 5: Check adding a new todo
  it('should add a new todo when form is submitted', async () => {
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await userEvent.type(input, 'Complete project');
    await userEvent.click(addButton);
    
    // Check if new todo appears
    expect(screen.getByText('Complete project')).toBeInTheDocument();
    
    // Check if stats updated
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (4)');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (4)');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (0)');
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input).toHaveValue('');
  });

  // Test 6: Check adding todo with Enter key
  it('should add a new todo when Enter key is pressed', async () => {
    const input = screen.getByTestId('todo-input');
    
    await userEvent.type(input, 'Enter key todo{enter}');
    
    expect(screen.getByText('Enter key todo')).toBeInTheDocument();
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (4)');
  });

  // Test 7: Check not adding empty todo
  it('should not add empty todo when form is submitted', async () => {
    const addButton = screen.getByTestId('add-button');
    const initialTodos = screen.getAllByRole('listitem').length;
    
    // Try to submit with empty input
    await userEvent.click(addButton);
    
    // Number of todos should remain the same
    expect(screen.getAllByRole('listitem').length).toBe(initialTodos);
  });

  // Test 8: Check toggling todo completion by clicking text
  it('should toggle todo completion status when todo text is clicked', async () => {
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('.todo-item');
    
    // Initially not completed
    expect(todoItem).not.toHaveClass('completed');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (3)');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (0)');
    
    // Click to toggle
    await userEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (2)');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (1)');
    
    // Click again to toggle back
    await userEvent.click(todoText);
    
    // Should be not completed again
    expect(todoItem).not.toHaveClass('completed');
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (3)');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (0)');
  });

  // Test 9: Check toggling todo completion by clicking checkbox
  it('should toggle todo completion status when checkbox is clicked', async () => {
    const todoId = 1;
    const checkbox = screen.getByTestId(`toggle-${todoId}`);
    const todoItem = checkbox.closest('.todo-item');
    
    // Initially not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click checkbox
    await userEvent.click(checkbox);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (1)');
  });

  // Test 10: Check deleting a todo
  it('should delete a todo when delete button is clicked', async () => {
    const deleteButton = screen.getByTestId('delete-1');
    
    // Check if todo exists
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (3)');
    
    // Delete the todo
    await userEvent.click(deleteButton);
    
    // Check if todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (2)');
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
  });

  // Test 11: Check deleting the correct todo
  it('should delete the correct todo when multiple todos exist', async () => {
    // Delete the second todo
    await userEvent.click(screen.getByTestId('delete-2'));
    
    // First todo should still exist
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    // Second todo should be gone
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    // Third todo should still exist
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 12: Check filter functionality - Active filter
  it('should show only active todos when active filter is selected', async () => {
    // First complete one todo
    await userEvent.click(screen.getByText('Learn React'));
    
    // Click active filter
    await userEvent.click(screen.getByTestId('filter-active'));
    
    // Should only show incomplete todos
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that active filter button has active class
    expect(screen.getByTestId('filter-active')).toHaveClass('active');
  });

  // Test 13: Check filter functionality - Completed filter
  it('should show only completed todos when completed filter is selected', async () => {
    // Complete two todos
    await userEvent.click(screen.getByText('Learn React'));
    await userEvent.click(screen.getByText('Build a Todo App'));
    
    // Click completed filter
    await userEvent.click(screen.getByTestId('filter-completed'));
    
    // Should only show completed todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
    
    // Check that completed filter button has active class
    expect(screen.getByTestId('filter-completed')).toHaveClass('active');
  });

  // Test 14: Check filter functionality - All filter
  it('should show all todos when all filter is selected', async () => {
    // Complete one todo
    await userEvent.click(screen.getByText('Learn React'));
    
    // Try different filters
    await userEvent.click(screen.getByTestId('filter-active'));
    await userEvent.click(screen.getByTestId('filter-completed'));
    
    // Click all filter
    await userEvent.click(screen.getByTestId('filter-all'));
    
    // Should show all todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check that all filter button has active class
    expect(screen.getByTestId('filter-all')).toHaveClass('active');
  });

  // Test 15: Check empty state message
  it('should show empty message when no todos match the selected filter', async () => {
    // Complete all todos
    const todos = ['Learn React', 'Build a Todo App', 'Write Tests'];
    for (const todo of todos) {
      await userEvent.click(screen.getByText(todo));
    }
    
    // Click active filter
    await userEvent.click(screen.getByTestId('filter-active'));
    
    // Should show empty message
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    expect(screen.getByText('No todos found')).toBeInTheDocument();
    
    // Todo list should be empty
    const todoItems = screen.queryAllByRole('listitem');
    expect(todoItems.length).toBe(0);
  });

  // Test 16: Check stats update correctly when toggling todos
  it('should update stats correctly when toggling multiple todos', async () => {
    // Toggle first todo
    await userEvent.click(screen.getByText('Learn React'));
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    
    // Toggle second todo
    await userEvent.click(screen.getByText('Build a Todo App'));
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
    expect(screen.getByText('Completed: 2')).toBeInTheDocument();
    
    // Toggle first todo back
    await userEvent.click(screen.getByText('Learn React'));
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
  });

  // Test 17: Check stats update correctly when deleting todos
  it('should update stats correctly when deleting todos', async () => {
    // Complete one todo first
    await userEvent.click(screen.getByText('Learn React'));
    
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Active: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    
    // Delete the completed todo
    await userEvent.click(screen.getByTestId('delete-1'));
    
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Active: 1')).toBeInTheDocument();
    expect(screen.getByText('Completed: 0')).toBeInTheDocument();
  });

  // Test 18: Check that each todo has correct testids
  it('should have unique testids for each todo element', () => {
    expect(screen.getByTestId('toggle-1')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-2')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-3')).toBeInTheDocument();
    
    expect(screen.getByTestId('todo-text-1')).toHaveTextContent('Learn React');
    expect(screen.getByTestId('todo-text-2')).toHaveTextContent('Build a Todo App');
    expect(screen.getByTestId('todo-text-3')).toHaveTextContent('Write Tests');
    
    expect(screen.getByTestId('delete-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-2')).toBeInTheDocument();
    expect(screen.getByTestId('delete-3')).toBeInTheDocument();
  });

  // Test 19: Check form submission with multiple todos
  it('should handle adding multiple todos sequentially', async () => {
    const input = screen.getByTestId('todo-input');
    const todos = ['First todo', 'Second todo', 'Third todo'];
    
    for (const todo of todos) {
      await userEvent.type(input, todo);
      await userEvent.click(screen.getByTestId('add-button'));
    }
    
    // Check all todos are added
    for (const todo of todos) {
      expect(screen.getByText(todo)).toBeInTheDocument();
    }
    
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (6)');
  });

  // Test 20: Check that filter persists after adding new todos
  it('should maintain filter state when adding new todos', async () => {
    // First set filter to active
    await userEvent.click(screen.getByTestId('filter-active'));
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New filtered todo');
    await userEvent.click(screen.getByTestId('add-button'));
    
    // Should still be on active filter
    expect(screen.getByTestId('filter-active')).toHaveClass('active');
    expect(screen.getByText('New filtered todo')).toBeInTheDocument();
  });

  // Test 21: Check accessibility attributes
  it('should have proper accessibility attributes', () => {
    const addButton = screen.getByTestId('add-button');
    const deleteButtons = screen.getAllByLabelText('Delete todo');
    
    expect(addButton).toBeInTheDocument();
    expect(deleteButtons.length).toBe(3);
    deleteButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label', 'Delete todo');
    });
  });

  // Test 22: Check that todo items have proper structure
  it('should have proper CSS classes based on completion status', async () => {
    const todoItem = screen.getByText('Learn React').closest('.todo-item');
    
    // Initially not completed
    expect(todoItem).toHaveClass('todo-item');
    expect(todoItem).not.toHaveClass('completed');
    
    // Toggle to completed
    await userEvent.click(screen.getByText('Learn React'));
    expect(todoItem).toHaveClass('todo-item completed');
  });

  // Test 23: Check that input field gets focus after adding todo
  it('should keep focus on input field after adding todo', async () => {
    const input = screen.getByTestId('todo-input');
    
    await userEvent.type(input, 'Focus test');
    await userEvent.click(screen.getByTestId('add-button'));
    
    expect(input).toHaveFocus();
  });

  // Test 24: Check that form doesn't submit with only spaces
  it('should not add todo with only spaces', async () => {
    const input = screen.getByTestId('todo-input');
    const initialCount = screen.getAllByRole('listitem').length;
    
    await userEvent.type(input, '   ');
    await userEvent.click(screen.getByTestId('add-button'));
    
    expect(screen.getAllByRole('listitem').length).toBe(initialCount);
  });

  // Test 25: Check that completed todos show strikethrough styling
  it('should apply strikethrough styling to completed todos', async () => {
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially no strikethrough
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Toggle to completed
    await userEvent.click(todoText);
    
    // Check if parent has completed class (which applies strikethrough via CSS)
    const todoItem = todoText.closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });
});