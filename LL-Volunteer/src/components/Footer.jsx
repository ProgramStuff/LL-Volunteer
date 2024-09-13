import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" marginTop={20} marginBottom={5} {...props}>
        <Link color="inherit" href="https://github.com/ProgramStuff"><GitHubIcon fontSize='large' /></Link>
        <Link color="inherit" href="https://www.linkedin.com/in/jordan-kelsey-824b00255/"><LinkedInIcon fontSize='large' /></Link>
        <br />
        {'Copyright © '}
        <Link color="inherit" href="https://jordan-k-portfolio.netlify.app/">
          Jordan Kelsey
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }