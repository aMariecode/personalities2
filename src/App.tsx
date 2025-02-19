import { useState } from 'react';
import { favAnimeList } from './data';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import "./App.css";
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

interface Anime {
  url: string;
  alt: string;
  name: string;
  description: string;
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const hasNext = index < favAnimeList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleBackClick() {
    if (index === 0) {
      setIndex(favAnimeList.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favAnime: Anime = favAnimeList[index];

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, minHeight: 600 }}>
      <CardHeader
        title="My Favorite Anime"
        subheader="PATRICIA MARIE MANDANAS - C-PEITEL3"
      />
      <CardActions disableSpacing>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleBackClick}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNextClick}>
            Next
          </Button>
        </Stack>
      </CardActions>
      <CardMedia
        component="img"
        height="250"
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        image={favAnime.url}
        alt={favAnime.alt}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {favAnime.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {index + 1 + " of " + favAnimeList.length}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ fontSize: 50 }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>{favAnime.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
