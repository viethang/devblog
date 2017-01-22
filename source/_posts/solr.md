layout: '[post]'
title: 'Working with Solr'
date: 2015-09-03 09:25:04
tags: solr
---
<ol>
<li>Install solr.
Download solr from apache home page: {% link solr 5.3.0 http://www.apache.org/dyn/closer.lua/lucene/solr/5.3.0  %}.
Uncompress the file to a folder, say <strong>solr-5.3.0</strong>.
</li>
<li>Start solr server.
From solr-5.3.0, run 

``` bash
$ bin/solr start
```
You will see
``` bash
Waiting up to 30 seconds to see Solr running on port 8983 [/]  
Started Solr server on port 8983 (pid=4762). Happy searching!
```
Now in your browser you can go to http://localhost:8983/solr and explore the solr admin page.
</li>
<li>Create a new core.
  Now try to create a name <strong>my_core</strong> with minimal basic schema
``` bash
$ bin/solr create -c my_core -d basic_configs
```
This command create a folder <strong>my_core</strong> in <strong>solr/server</strong> with two folders <strong>conf/</strong> and <strong>data/</strong>. In <strong>conf/</strong> we find several configuration .xml files, but the two most important configuration files are <strong>schema.xml</strong> and <strong>solrconfig.xml</strong>.
</li>

<li>Define custom fields for your documents.
For example, my_core indexes companies and you would like each document contain a field named <strong>coordinates</strong> which stores the coordinates and a field named <strong>products</strong> which stores the lists of products of the company.
In <strong>schema.xml</strong> add the following
<field name='coordinates' type='location' indexed='true'>
<field name='products' type='text' multiValued='true'>
Attribute multiValued='true' allows you to store several products in products field.
</li>
<li>Indexing documents
  There are several ways to index a document.
  <ol>
    <li>Use curl. Suppose that you want to index a document comps.json with content
    <pre>
    [
        {
            id: 'Big Company',
            coordinates: '4.6789, 2.3456',
            products: 'television',
            products: 'car'
        }
    ]
    </pre>
    ``` bash
    $ curl 'http://localhost:8983/solr/my_core/update?commit=true' @path/to/file/comps.json
    ```
    Note: commit='true' allows the document be immediately searchable.
    
    You can also do 
    ``` bash
    $ curl 'http://localhost:8983/solr/my_core/update?commit=true' -d '[{id: 'Big Company', coordinates: 4.6789, 2.3456', products: 'television', products: 'car'}]'
    ```
    </li>
    <li>In solr admin page.
      Select my_core in Core selector and the choose Documents, request handler = /select, document type = JSON. Then in the Document(s) field type 
    {
        id: 'Big Company',
        coordinates: '4.6789, 2.3456',
        products: 'television',
        products: 'car'
    }
      
    </li>
    <li>Use bin/post
     $ bin/post -c my_core path/to/file/bigcomp.json
  </ol>
  
  <li>Delete all indexes in a core.
  ``` bash
  $ curl 'http://localhost:8983/solr/my_core/update?stream.body=<delete><query>*:*</query></delete>&commit=true'
```
or 
``` bash
bin/post -c fresh_core -d '<delete><query>*:*</query></delete>'
```
</li>
<li>Delete a specific document
``` bash
$ bin/post -c fresh_core -d '<delete><id>qtA3iu</id></delete>'
``` 
``` bash
$ curl http://localhost:8983/solr/my_core/update?commit=true -d '<delete><query>id:AbkjlkG</query></delete>'
```

</li>
</ol>