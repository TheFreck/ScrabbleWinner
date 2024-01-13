# ScrabbleWinner
(This was a fivethirtyeight.com Riddler)

Seeks the optimal arrangement of all 100 scrabble tiles to grant the highest score possible

This console app was created to solve the 538 dot com weekly riddler. The goal was to find the highest score word that can be made out of all 100 scrabble tiles.
This means that if a word is made up of smaller words then the constituent words are also counted and scored.

## Resources
This was written in JavaScript. There is a dictionary file that includes an array of the words that the riddler provided.
Since each letter as a score there is an object to pair each letter with its score.
Since there are multiple tiles for many of the letters there is an object that pairs each letter with its distribution among the 100.
There are also blank tiles that act as wilds but do not have a score.

### Approach
The method wordScorer() determines the value of the word.
"eliminateTheImposible" is an object that includes a method to check the words against available letters in the letter distribution object and a method to run it against the entire dictionary
Now that we've eliminated the impossible words (because there are not enough letters to form them) we can score the words
In the prior step the wild tiles were used to form words that otherwise couldn't be formed. 
But those wild tiles do not get scored so both methods are smart enough to include the wild only if needed and count it without a score.

The entire operation takes a little while to run (there are around 150k words in the dictionary and each word gets looped through multiple times) 
so there is also a dictionaryTest page with fewer words in order to ensure correct processing.
