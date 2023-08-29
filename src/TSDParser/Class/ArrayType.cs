using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class ArrayType : Node
    {
        public SyntaxKind Kind => SyntaxKind.ArrayType;

        public Node ElementType { get; set; }
    }
}
