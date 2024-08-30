import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" marginTop={35} {...props}>
        <GitHubIcon fontSize='large' />
        <LinkedInIcon fontSize='large' />
        <br />
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Jordan Kelsey
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }