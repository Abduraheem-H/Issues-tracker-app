"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import React from 'react'



function NavBar() {
	const currentPath = usePathname()
	console.log(currentPath)
	const links = [
		{ name: 'Dashboard', href: '/' },
		{ name: 'Issues', href: '/issues' },
	]
  return (
	<nav className='flex space-x-7'>
		<Link href="/">Logo</Link>
		
		<ul className='flex space-x-5 mb-5 border-b border-zinc-200 pb-5 px-5 h-14 items-center'>
			{links.map((link) => (
				<li key={link.href}>
					<Link className={classNames({
						'text-zinc-900 border-b-2 border-zinc-900 pb-2': currentPath === link.href,
						'text-gray-600 border-b-2 border-transparent pb-2': currentPath !== link.href,
						'hover:text-zinc-800 hover:border-b-2 hover:border-zinc-800 pb-2 transition-colors': true,

					})} href={link.href}>{link.name}</Link>
				</li>
			))}
		</ul>
	</nav>
  )
}

export default NavBar