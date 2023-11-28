import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material"

import { useEffect } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import NextLink from 'next/link'
import Head from 'next/head'
import {useRouter, useSearchParams} from 'next/navigation'

import type { NextPageWithLayout } from '~/src/pages/_app'
import { Layout as AuthLayout } from '~/src/layouts/auth/classic-layout'
import { AuthIssuer } from '~/src/sections/auth/auth-issuer'
import { IssuerGuard } from '~/src/guards/issuer-guard'
import { GuestGuard } from '~/src/guards/guest-guard'
import { Issuer } from '~/src/utils/auth'
import {useAuth} from '~/src/hooks/use-auth'
import {useMounted} from '~/src/hooks/use-mounted'
import { paths } from '~/src/paths'
import {useSelector} from '~/src/store'

const useParams = () => {
  const searchParams = useSearchParams()
  const returnTo = searchParams?.get('returnTo') ?? undefined
  return {
    returnTo
  }
}

const Login: NextPageWithLayout = () => {
  const isMounted = useMounted()
  const router = useRouter()
  const { returnTo } = useParams()
  const { issuer, signIn } = useAuth()
  const jwt = useSelector((state) => state.jwt)

  useEffect(
    () => {
      if (jwt.isAuthenticated) {
        router.push(returnTo ?? paths.dashboard.index)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jwt],
  )

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(7),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password)
      } catch (err) {
        console.error(err)
        if (isMounted()) {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: (err as Error).message })
          helpers.setSubmitting(false)
        }
      }
    }
  })

  return (
      <>
        <Head>
          <title>
            Login | Devias Kit PRO
          </title>
        </Head>
        <div>
          <Card elevation={16}>
            <CardHeader
                subheader={(
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                      Don&apos;t have an account?
                      &nbsp;
                      <Link
                          component={NextLink}
                          href={paths.auth.jwt.register}
                          underline="hover"
                          variant="subtitle2"
                      >
                        Register
                      </Link>
                    </Typography>
                )}
                sx={{ pb: 0 }}
                title="Log in"
            />
            <CardContent>
              <form
                  noValidate
                  onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                      autoFocus
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Address"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                  />
                  <TextField
                      error={!!(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      label="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                    <FormHelperText
                        error
                        sx={{ mt: 3 }}
                    >
                      {formik.errors.submit}
                    </FormHelperText>
                )}
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                >
                  Log In
                </Button>
              </form>
            </CardContent>
          </Card>
          <Stack
              spacing={3}
              sx={{ mt: 3 }}
          >
            <Alert severity="error">
              <div>
                You can use <b>demo@devias.io</b> and password <b>Password123!</b>
              </div>
            </Alert>
            <AuthIssuer issuer={issuer} />
          </Stack>
        </div>
      </>
  )
}

Login.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestGuard>
  </IssuerGuard>
)

export default Login
