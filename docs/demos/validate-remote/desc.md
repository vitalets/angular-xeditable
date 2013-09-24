You can perform remote validation e.g. checking username in db.
For that define validation method returning `$q` **promise**. 
If promise resolves to **string** validation failed.