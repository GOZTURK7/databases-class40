export const totalPopulationOfTheCountryByYear = async (client, country)=>{

    var pipeline = [
        {
          '$match': {
            'Country': country
          }
        }, 
        {
          '$group': {
            '_id': '$Year', 
            'countPopulation': {
              '$sum': {
                '$sum': [
                  '$M', '$F'
                ]
              }
            }
          }
        }, 
        {
          '$sort': {
            '_id': 1
          }
        }
      ]

    const cursor = await client.db('databaseWeek4').collection('countries').aggregate(pipeline);

    const result = await cursor.toArray();

    console.log(result);
};

export const totalPopulationOfContinentsByYearAndAge = async (client, year, age) => {

    var pipeline = [
        {
          '$match': {
            '$and': [
              {
                'Country': {
                  '$in': [
                    'AFRICA', 'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'
                  ]
                }
              },
              {
                'Year': year
              },
              {
                'Age': age
              }
            ]
          }
        },
        {
          '$addFields': {
            'totayPopulation': {
              '$sum': [
                '$M', '$F'
              ]
            }
          }
        }
      ];

      const cursor = await client.db('databaseWeek4').collection('countries').aggregate(pipeline);

      const result = await cursor.toArray();

      console.log(result);
};
