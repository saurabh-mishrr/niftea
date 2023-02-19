import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

const Post = () => {
  const router = useRouter()
  const { tdate } = router.query

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.chartCanva}><p>Post: {tdate}</p></div>
        </div>
      </main>
    </>
  )

}

export default Post