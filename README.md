DESCRIPCIÓN DLE PROYECTO.

En el Sprint 2 se trabajó en el desarrollo de una base de datos, capaz de gestionar el CRUD(Create, Read, Upload, Delete) de los proyectos. Los proyectos son el principal objeto a trabajar en el proyecto, pero existen muchos más objetos que juegan papeles importantes en la base de datos. Para dimensionar y visualizar de una manera más clara estas relaciones, hacemos uso del Diagrama de Entidad Relación, este tipo de diagramas me permite definir una estructura de datos o información que se puede implementar en una base de datos, normalmente una base de datos relacional.

Para desarrollar el esquema fue necesario discutir y abstraer de las Historias de Usuarios cuáles serían los objetos a trabajar y sus relaciones, o mejor conocidos las Entidades que tendrá nuestra base de datos, además de identificar qué variables tienen un grupo de opciones limitadas para seleccionar conocidas como enum.

Utilizando las historias de usuario se lograron identificar 4 Entidades que son Usuarios, Proyecto, Objetivo, Inscripción, muchas de estas entidades comenzaron como una variable pero al revisar y analizar los requerimientos nos dimos cuenta que era necesario que sea una entidad que se relacione. Los enum fue un caso similar ya que comenzaron como una variable pero es necesario que estas variables contienen unas opciones limitadas

Para diseñar el diagrama de Entidad Relación del proyecto, se usó la herramienta web llamada creately, en ella se creó el proyecto donde los integrantes del equipo fueron aportando y construyendo el diagrama
