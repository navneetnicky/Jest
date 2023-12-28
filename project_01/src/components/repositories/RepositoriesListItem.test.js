import { render, screen, act } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router-dom';
import { async } from 'validate.js';

// To remove (...act) warning
// jest.mock('../tree/FileIcon', () => {
// 	return () => {
// 		return 'File Icon Component';
// 	};
// } );

function renderComponent() {
	const repository = {
		full_name: 'facebook/react',
		language: 'javascript',
		description: 'A js library',
		owner: {
			login: 'facebook',
		},
		name: 'react',
		html_url: 'https://github.com/facebook/react',
	};
	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>
	);

	return { repository };
}

test('shows a link to the github homepage for this repository', async () => {
	const { repository } = renderComponent();

	// To remove (...act) warning
	await screen.findByRole('img', {
		name: 'javascript',
	});

	const link = screen.getByRole('link', { name: /github repository/i });
	expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a fileicon wth the appropriate icon', async () => {
	const { repository } = renderComponent();
	const icon = await screen.findByRole('img', { name: 'javascript' });

	expect(icon).toHaveClass('js-icon');
});


test( 'show a link to the code editor page', async() =>
{
  const { repository } = renderComponent();
  await screen.findByRole( 'img', { name: 'javascript' } );

  const link = await screen.findByRole( 'link', {
    name : new RegExp(repository.owner.login)
  } )
  
  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})