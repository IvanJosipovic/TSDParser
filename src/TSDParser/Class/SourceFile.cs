using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;
using TSDParser.Interfaces;

namespace TSDParser.Class
{
    public class SourceFile : Node
    {
        public SyntaxKind Kind { get; } = SyntaxKind.SourceFile;

        public List<Node> Statements { get; set; }
    }
}
