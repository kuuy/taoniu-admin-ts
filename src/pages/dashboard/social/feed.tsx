import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { socialApi } from '~/src/api/social'
import { useMounted } from '~/src/hooks/use-mounted'
import { SocialPostAdd } from '~/src/sections/dashboard/social/social-post-add'
import { SocialPostCard } from '~/src/sections/dashboard/social/social-post-card'
import type { Post } from '~/src/types/social'
import DashboardLayout from '~/src/layouts/dashboard'
import {NextPageWithLayout} from '~/src/pages/_app'

const usePosts = (): Post[] => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await socialApi.getFeed();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePostsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return posts
}

const Page:NextPageWithLayout = () => {
  const posts = usePosts()

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Social Feed
            </Typography>
            <Typography variant="h4">
              Here&apos;s what your connections posted
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            <SocialPostAdd />
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default Page
