import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Rules from './components/Rules'
import Filter from './components/Filter'
import RulesByTitle from './components/RulesByTitle'
import Title from './components/Title'


const App = () => {
  const [filterField, setFilterField] = useState('')
  const [rules, setRules] = useState('')
  const [arrayOfRules, setArrayOfRules] = useState([])
  const [arrayOfTitles, setArrayOfTitles] = useState([])
  const [ruleToShow, setRuleToShow] = useState([])
  const [title, setTitle] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const [previousTitle, setPreviousTitle] = useState('')


  var filterTimeoutHandle;

  const handleFilterChange = (event) => {
    const filterText = event.target.value;
    if (filterTimeoutHandle !== undefined) {
      clearTimeout(filterTimeoutHandle);
    }

    filterTimeoutHandle = setTimeout(() => {
      setFilterField(filterText);
    }, 750)
  }

  const getRulesText = () => {
    var tempRules;
    let rawFile = new XMLHttpRequest();

    rawFile.open("GET", "https://evening-wildwood-55510.herokuapp.com/https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt", false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
          tempRules = allText;
          setRules(allText);
        }
      }
    };

    rawFile.send(null);
    parseText(tempRules)
  }

  useEffect(getRulesText, []);

  const parseText = (tempRules) => {
    var titles = tempRules.match(/^\d{3}\.+([^0-9]).*?$/gms)
    var uniqueTitles = [...new Set(titles)]
    var tempTitles = titles.toString()
    var titleIds = tempTitles.match(/\d{3}/gms)
    var content = tempRules.match(/^\d+\.\d+[.a-z].*?^$/gms)
    var contentIds = tempRules.match(/^\d+\.\d+[.a-z]/gms)

    var contentArray = []
    for (var i = 0; i < content.length; i++) {
      var contentObject = {
        id: contentIds[i],
        content: content[i]
      }
      contentArray.push(contentObject)
    }

    var titleArray = []
    for (var j = 0; j < uniqueTitles.length; j++) {
      var titleObject = {
        id: titleIds[j],
        title: uniqueTitles[j]
      }
      titleArray.push(titleObject)
    }
    setArrayOfTitles(arrayOfTitles.concat(titleArray))
    setArrayOfRules(arrayOfRules.concat(contentArray))
  }

  const clearRuleToShow = () => {
    setRuleToShow([])
  };

  const onSelect = (titleObject) => {
    clearRuleToShow()
    setIsSelected(true)
    setFilterField('')
    var titleId = titleObject.id;
    var ruleArray = arrayOfRules;
    var rulesByTitle = [];

    for (var i = 0; i < ruleArray.length; i++) {
      if (typeof ruleArray[i].content !== undefined && ruleArray[i].content.substring(0, 3) === titleId) {
        rulesByTitle.push(ruleArray[i]);
      }
    }
    setRuleToShow(newArray => newArray.concat(rulesByTitle))
    setTitle(titleObject.title)
    setPreviousTitle(titleObject.title)
  }

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }


  return (
    <div>
      <Container id="container" fixed>
        <Typography><strong><h1>Magic: The Gathering rules</h1></strong></Typography>
        <Typography><strong><h2>Table of content</h2></strong></Typography>
        <Grid container>
          <Grid item xs={6}>
            <List className="list">
              {arrayOfTitles.map(titleObject => (
                <ListItem key={titleObject.id}><ListItemLink href="#" onClick={() => onSelect(titleObject)}><ListItemText>{titleObject.title}</ListItemText></ListItemLink></ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Filter filter={setFilterField} changeFilter={handleFilterChange} />
            <Title title={title} filterField={filterField} previousTitle={previousTitle} setTitle={setTitle}></Title>
            <div>{isSelected === true ? <p></p> : <i><strong>Click titles or search with keywords</strong></i>}</div>
            <List className="list">
              {filterField !== '' ? <Rules arrayOfRules={arrayOfRules} filter={filterField} selected={setIsSelected}></Rules> : <RulesByTitle ruleToShow={ruleToShow}></RulesByTitle>}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App