import Link from 'next/link'
import React from 'react'

function NavBar() {
	const links = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Issues', href: '/issues' },
	]
  return (
	<nav className='flex space-x-7'>
		<Link href="/">Logo</Link>
		
		<ul className='flex space-x-5 mb-5 border-b border-zinc-200 pb-5 px-5 h-14 items-center'>
			{links.map((link) => (
				<li key={link.href}>
					<Link className='text-zinc-500 hover:text-zinc-700 transition-colors' href={link.href}>{link.name}</Link>
				</li>
			))}
		</ul>
	</nav>
  )
}

export default NavBar