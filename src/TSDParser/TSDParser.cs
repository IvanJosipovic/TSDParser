﻿using Sprache;

namespace TSDParser
{
    public static class TSDParser
    {
        public static Parser<string> Name = Parse.Identifier(Parse.Letter, Parse.LetterOrDigit).Except(Parse.WhiteSpace);

        public static Parser<string> TypeName = Parse.Identifier(Parse.Letter, Parse.LetterOrDigit);

        public static Parser<string> ParseComment()
        {
            return
                from comment in new CommentParser("//", "/*", "*/", "\r\n").AnyComment.Token()
                select comment.Trim()
                              .Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)
                              .Select(RemoveChars)
                              .Aggregate((x, y) => x + "\r\n" + y).Trim();

            static string RemoveChars(string line)
            {
                return line.Trim().TrimStart('*').TrimStart('~').Trim();
            }
        }

        public static Parser<Interface> Interface =
            from comment in ParseComment().Optional()
            from _ in Parse.String("export interface").Token()
            from name in Name.Token()

            from extends_token in Parse.String("extends").Token().Optional()
            from extends in Name.Token().DelimitedBy(Parse.Char(',').Token()).Optional()

            from openBrace in Parse.Char('{').Token()
            from functions in Function.Many().Optional()
            from properties in Property.Many().Optional()
            from closeBrace in Parse.Char('}').Token()
            select new Interface
            {
                CommentText = comment.GetOrDefault(),
                Name = name,
                Functions = functions.GetOrDefault()?.ToList(),
                Properties = properties.GetOrDefault()?.ToList(),
                Extends = extends.GetOrDefault()?.ToList()
            };

        public static Parser<Function> Function =
            from comment in ParseComment().Optional()
            from name in Name.Token()
            from colon in Parse.String(":").Token().Optional()
            from brackets in Parse.String("()").Token()
            from arrow in Parse.String("=>").Token().Optional()
            from colon2 in Parse.String(":").Token().Optional()
            from type in TypeName.Token()
            from semicolon in Parse.Char(';').Token()
            select new Function
            {
                CommentText = comment.GetOrDefault(),
                Name = name,
                Type = type,
            };

        public static Parser<Property> Property =
            from comment in ParseComment().Optional()
            from name in Name.Token()
            from nullable in Parse.Char('?').Optional()
            from colon in Parse.Char(':').Token()
            from type in TypeName.Token()
            from array in Parse.String("[]").Optional()
            from semicolon in Parse.Char(';').Token()
            select new Property
            {
                CommentText = comment.GetOrDefault(),
                Name = name,
                Type = type,
                IsArray = array.IsDefined,
                IsNullable = nullable.IsDefined
            };
    }

    public class Function : Comment
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }

    public class Property : Comment
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsNullable { get; set; }
        public bool IsArray { get; set; }
    }

    public class Type
    {
        public string Name { get; set; }
        public bool IsNullable { get; set; }
        public bool IsArray { get; set; }
    }

    public class Interface : Comment
    {
        public string Name { get; set; }
        public List<string> Extends { get; set; }
        public List<Function> Functions { get; set; }
        public List<Property> Properties { get; set; }
    }

    public abstract class Comment
    {
        public string? CommentText { get; set; }
    }
}
