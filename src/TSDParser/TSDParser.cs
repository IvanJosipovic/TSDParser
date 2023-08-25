using Sprache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSDParser
{
    public static class TSDParser
    {
        public static Parser<string> Name = Parse.Identifier(Parse.Letter, Parse.LetterOrDigit);

        public static Parser<string> TypeName = Parse.Identifier(Parse.Letter, Parse.LetterOrDigit);

        public static Parser<Interface> Interface =
            from exp in Parse.String("export").Text().Token()
            from inter in Parse.String("interface").Text().Token()
            from name in Name.Token()
            from openBrace in Parse.Char('{').Token()
            from properties in Property.Many()
            from closeBrace in Parse.Char('}').Token()
            select new Interface
            {
                Name = name,
                Properties = properties.ToList()
            };

        public static Parser<Property> Property =
            from name in Name.Token()
            from nullable in Parse.Char('?').Optional()
            from colon in Parse.Char(':').Token()
            from type in TypeName.Token()
            from array in Parse.String("[]").Optional()
            from semicolon in Parse.Char(';').Token()
            select new Property
            {
                Name = name,
                Type = type,
                IsArray = array.IsDefined,
                IsNullable = nullable.IsDefined
            };
    }

    public class Property
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsNullable { get; set; }
        public bool IsArray { get; set; }

    }

    public class Interface : Comment
    {
        public string Name { get; set; }
        public List<Property> Properties { get; set; }
    }

    public abstract class Comment
    {
        public string? CommentText { get; set; }
    }
}
