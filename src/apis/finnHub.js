import axios from 'axios'

const API_KEY = 'cp1737pr01qu1k1htqr0cp1737pr01qu1k1htqrg'

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: API_KEY
  }
})