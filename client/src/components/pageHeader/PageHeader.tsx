import React from 'react'
import styles from './PageHeader.module.css'

export default function PageHeader({ p, h1 }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <p>{p}</p>
          <h1>{h1}</h1>
        </div>
      </div>
    </div>
  )
}
