import {useRouter} from 'next/navigation'
import {paths} from '~/src/paths'

export default function Home() {
  const router = useRouter()
  router.push(paths.dashboard.index)
}
