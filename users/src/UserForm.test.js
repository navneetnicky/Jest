import { render, screen } from '@testing-library/react';
import User from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
	//render the component
	render(<UserForm onUserAdd={() => {}} />);

	//Manipulate the component or find  an element in it\
	const inputs = screen.getAllByRole('textbox');
	const button = screen.getByRole('button');

	//Assertion  -  make sure the component is doing what we expect it to do
	expect(inputs).toHaveLength(2);
	expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', async () => {
	// NOT THE BEST IMPLEMENTATION
	// const argList = [];
	// const callback = (...args) => {
	// 	argList.push(args);
	// };

	// BEST IMPLEMENTATION

	const mock = jest.fn();

	// Try to render my component
	render(<UserForm onUserAdd={mock} />);

	// Find the two inputs
	const nameInput = screen.getByRole('textbox', { name: /name/i });
	const emailInput = screen.getByRole('textbox', { name: /email/i });

	//Simulate  typing in a name
	await User.click(nameInput);
	await User.keyboard('jane');

	//Simulate typing in an email
	await User.click(emailInput);
	await User.keyboard('jane@jane.com');

	//Find the button
	const button = screen.getByRole('button');

	// Simulate clicking the button
	await User.click(button);

	// Assertion to make sure 'onUserAdd' gets called with email/name
	// expect( argList ).toHaveLength( 1 );
	// expect(argList[0][0]).toEqual({name: 'jane', email: 'jane@jane.com'})

	expect(mock).toHaveBeenCalled();
	expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@jane.com' });
});

test('empties the two inputs when form is submitted', async () => {
	render(<UserForm onUserAdd={() => {}} />);

	const nameInput = screen.getByRole('textbox', {
		name: /name/i,
	});

	const emailInput = screen.getByRole('textbox', {
		name: /email/i,
	});

	const button = screen.getByRole('button');

	await User.click(nameInput);
	await User.keyboard('jane');
	await User.click(emailInput);
	await User.keyboard('jane@jane.com');
	await User.click(button);

	expect(nameInput).toHaveValue('');
	expect(emailInput).toHaveValue('');
});
