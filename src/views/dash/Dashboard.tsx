import { FC } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Exchange from '../../components/Exchange'
import Converter from '../../components/Converter'
import History from '../../components/History'

const Dashboard:FC  = () => {
  return (
    <div className="b-dashboard">    
      <Tabs defaultActiveKey="exchange">
        <Tab eventKey="exchange" title="Курсы валют">
          <Exchange />
        </Tab>
        <Tab eventKey="converter " title="Конвертор">
          <Converter />
        </Tab>
        <Tab eventKey="history" title="История">
          <History />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Dashboard