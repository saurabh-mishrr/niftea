import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import ROUTES from '@/routes/api'
import { Chart } from 'chart.js/auto'
import * as Utils from '../core/Utils'
import axios from 'axios';


(async () => {

  try {
    const res = await axios.get(ROUTES.get.banknifty, {responseType: 'json'})
    const result = res.data

    let {labels, bn50_per, bn49_per } = {...result.data}
    
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'BN-50',
          data: bn50_per,
          borderColor: Utils.CHART_COLORS.green,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0),
          borderWidth: 1,
          borderRadius:2,
          borderSkipped: false,
        },
        {
          label: 'BN-49',
          data: bn49_per,
          borderColor: Utils.CHART_COLORS.yellow,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0),
          borderWidth: 1,
          borderRadius: 2,
          borderSkipped: false,
        }
      ]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'BankNifty'
          }
        }
      },
    };
  
    if (typeof window !== typeof undefined) {
      new Chart(
        document.getElementById('acquisitions'),
        config
      )
    }

  } catch (err) {
    console.log(err)
  }

})();

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.chartCanva}><canvas id="acquisitions"></canvas></div>
        </div>
      </main>
    </>
  )
}