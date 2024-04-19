import React from 'react';
import { Drawer, Text } from '@mantine/core';
import { Group, Code } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Paper } from '@mantine/core';

const Sidebar = () => {
    const data = [
        { link: '', label: 'Notifications' },
        { link: '', label: 'Billing'},
        { link: '', label: 'Security'},
        { link: '', label: 'SSH Keys' },
        { link: '', label: 'Databases' },
        { link: '', label: 'Authentication'},
        { link: '', label: 'Other Settings'},
      ];
    const [active, setActive] = React.useState('Billing');

    const links = data.map((item) => (
        <a
        className="link"
        data-active={item.label === active || undefined}
        href={item.link}
        key={item.label}
        onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
        }}
        >
        <span>{item.label}</span>
        </a>
    ));
  return (
    
    <Drawer
    position="left"
    size={300} // Adjust this value to control the width of the sidebar
    padding="md"
    shadow="xs"
    zIndex={90} 
    style={{ height: '100vh' }}
    >
      <Text align="center">Sidebar</Text>
      {/* Add your sidebar content here */}
      <Paper padding="sm" shadow="md" style={{ borderRadius: 12, borderRight: '1px solid #E5E5E5' }}>
      <Text size="xl" align="center" weight={700} style={{ marginBottom: 20 }}>
        Sidebar
      </Text>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: 10 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </li>
        <li style={{ marginBottom: 10 }}>
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            About
          </Link>
        </li>
        <li style={{ marginBottom: 10 }}>
          <Link to="/services" style={{ textDecoration: 'none', color: 'inherit' }}>
            Services
          </Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </Paper>
    </Drawer>
    // <nav className="navbar">
    //   <div className="navbarMain">
    //     <Group className="header" justify="space-between">
    //       <Code fw={700}>v3.1.2</Code>
    //     </Group>
    //     {links}
    //   </div>

    //   <div className="footer">
    //     <a href="#" className="link" onClick={(event) => event.preventDefault()}>
    //       {/* <IconSwitchHorizontal className="linkIcon" stroke={1.5} /> */}
    //       <span>Change account</span>
    //     </a>

    //     <a href="#" className="link" onClick={(event) => event.preventDefault()}>
    //       {/* <IconLogout className="linkIcon" stroke={1.5} /> */}
    //       <span>Logout</span>
    //     </a>
    //   </div>
    // </nav>
  );
}

export default Sidebar;