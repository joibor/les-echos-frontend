import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import { mq } from '@/theme/breakpoints.ts'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  height: 100%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`

const Thumbnail = styled.div`
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  ${mq.up('lg')} {
    aspect-ratio: 4 / 3;
  }
`

const Body = styled.div`
  padding: 12px;
  flex: 1;
  overflow: hidden;

  ${mq.up('md')} {
    padding: 16px;
  }
`

const Description = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
` as typeof Typography

const Footer = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`

export { Description, Card, Thumbnail, Body, Footer }
